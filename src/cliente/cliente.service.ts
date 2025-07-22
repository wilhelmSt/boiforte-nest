import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClienteDto, UpdateClienteDto } from './cliente.dto';
import { Prisma, Cliente } from '@prisma/client';

@Injectable()
export class ClienteService {
  constructor(private prisma: PrismaService) {}

  async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
    const data: Prisma.ClienteCreateInput = {
      nome: createClienteDto.nome,
      cpfCnpj: createClienteDto.cpfCnpj,
      telefone: createClienteDto.telefone,
      email: createClienteDto.email,
      endereco: createClienteDto.endereco,
      observacao: createClienteDto.observacao,
    };

    return this.prisma.cliente.create({ data });
  }

  async findAll(query: string = ''): Promise<Cliente[]> {
    const whereCondition: Prisma.ClienteWhereInput = query?.trim()
      ? { nome: { contains: query, mode: 'insensitive' } }
      : {};

    return this.prisma.cliente.findMany({
      where: whereCondition,
      orderBy: { nome: 'asc' },
    });
  }

  async findOne(id: number): Promise<Cliente> {
    const cliente = await this.prisma.cliente.findUnique({ where: { id } });
    if (!cliente) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado`);
    }
    return cliente;
  }

  async update(id: number, updateClienteDto: UpdateClienteDto): Promise<Cliente> {
    await this.findOne(id);
    return this.prisma.cliente.update({
      where: { id },
      data: updateClienteDto,
    });
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id);
    await this.prisma.cliente.delete({ where: { id } });
    return { message: `Cliente com ID ${id} removido com sucesso.` };
  }

  async search(
    query: string,
    page: number = 1,
    limit: number = 10,
    orderBy: string = 'nome',
    orderDirection: 'asc' | 'desc' = 'asc',
    filters?: {
      minPedidos?: number;
      maxPedidos?: number;
      dataInicio?: Date;
      dataFim?: Date;
    }
  ): Promise<{ data: Cliente[]; total: number; pages: number }> {
    const validOrderFields = ['nome', 'endereco', 'telefone', 'ultimo_pedido', 'quantidade_pedidos'];
    const sortField = validOrderFields.includes(orderBy) ? orderBy : 'nome';

    const whereCondition: Prisma.ClienteWhereInput = {
      AND: [
        query?.trim()
          ? {
              OR: [
                { nome: { contains: query, mode: 'insensitive' } },
                { cpfCnpj: { contains: query } },
                { telefone: { contains: query } },
                { email: { contains: query, mode: 'insensitive' } },
                { endereco: { contains: query, mode: 'insensitive' } },
              ],
            }
          : {},
        filters?.minPedidos ? { quantidade_pedidos: { gte: filters.minPedidos } } : {},
        filters?.maxPedidos ? { quantidade_pedidos: { lte: filters.maxPedidos } } : {},
        filters?.dataInicio ? { createdAt: { gte: filters.dataInicio } } : {},
        filters?.dataFim ? { createdAt: { lte: filters.dataFim } } : {},
      ],
    };

    const [clientes, total] = await Promise.all([
      this.prisma.cliente.findMany({
        where: whereCondition,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          [sortField]: orderDirection,
        },
        include: {
          Compra: false,
          CompraRecorrente: false,
        },
      }),
      this.prisma.cliente.count({ where: whereCondition }),
    ]);

    return {
      data: clientes,
      total,
      pages: Math.ceil(total / limit),
    };
  }

  async getTopClientes(): Promise<Cliente[]> {
    const withPedidos = await this.prisma.cliente.findMany({
      where: {
        quantidade_pedidos: {
          gte: 1,
        },
      },
      take: 3,
      orderBy: {
        quantidade_pedidos: 'desc',
      },
    });

    if (withPedidos.length < 3) {
      const restantes = 3 - withPedidos.length;
      const withoutPedidos = await this.prisma.cliente.findMany({
        where: {
          quantidade_pedidos: null,
        },
        take: restantes,
        orderBy: {
          createdAt: 'desc',
        },
      });
      return [...withPedidos, ...withoutPedidos];
    }

    return withPedidos;
  }

  async getClientesAtivos(): Promise<{ clientesAtivos: number }> {
    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

    const quantity = await this.prisma.cliente.count({
      where: {
        ultimo_pedido: {
          gte: twoMonthsAgo,
          not: null,
        },
      },
    });

    return { clientesAtivos: quantity };
  }
}
