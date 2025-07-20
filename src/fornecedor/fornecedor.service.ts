import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFornecedorDto, UpdateFornecedorDto } from './fornecedor.dto';
import { Prisma } from '@prisma/client';

type Fornecedor = Prisma.FornecedorGetPayload<object>;

@Injectable()
export class FornecedorService {
  constructor(private prisma: PrismaService) {}

  async create(createFornecedorDto: CreateFornecedorDto): Promise<Fornecedor> {
    const data: Prisma.FornecedorCreateInput = {
      nome: createFornecedorDto.nome,
      cnpj: createFornecedorDto.cnpj,
      telefone: createFornecedorDto.telefone,
      email: createFornecedorDto.email,
      endereco: createFornecedorDto.endereco,
      observacao: createFornecedorDto.observacao,
    };

    return this.prisma.fornecedor.create({ data });
  }

  async findAll(): Promise<Fornecedor[]> {
    return this.prisma.fornecedor.findMany({
      orderBy: {
        nome: 'asc',
      },
    });
  }

  async findOne(id: number): Promise<Fornecedor> {
    const fornecedor = await this.prisma.fornecedor.findUnique({
      where: { id },
    });

    if (!fornecedor) {
      throw new NotFoundException(`Fornecedor com ID ${id} não encontrado`);
    }

    return fornecedor;
  }

  async update(id: number, updateFornecedorDto: UpdateFornecedorDto): Promise<Fornecedor> {
    await this.findOne(id);

    return this.prisma.fornecedor.update({
      where: { id },
      data: updateFornecedorDto,
    });
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id);

    await this.prisma.fornecedor.delete({
      where: { id },
    });

    return { message: `Fornecedor com ID ${id} removido com sucesso.` };
  }

  async search(
    query: string,
    page: number,
    limit: number,
    orderBy: string,
    orderDirection: 'asc' | 'desc'
  ): Promise<{ data: Fornecedor[]; total: number; pages: number }> {
    const validOrderFields = ['nome', 'endereco', 'telefone', 'ultima_entrada', 'quantidade_lotes'];
    const sortField = validOrderFields.includes(orderBy) ? orderBy : 'nome';

    const whereCondition: Prisma.FornecedorWhereInput = query?.trim()
      ? {
          OR: [
            { nome: { contains: query, mode: 'insensitive' } },
            { cnpj: { contains: query } },
            { telefone: { contains: query } },
            { email: { contains: query, mode: 'insensitive' } },
          ],
        }
      : {};

    const [fornecedores, total] = await Promise.all([
      this.prisma.fornecedor.findMany({
        where: whereCondition,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          [sortField]: orderDirection,
        },
      }),
      this.prisma.fornecedor.count({ where: whereCondition }),
    ]);

    return {
      data: fornecedores,
      total,
      pages: Math.ceil(total / limit),
    };
  }

  async getTopFornecedores(): Promise<Fornecedor[]> {
    const withLotes = await this.prisma.fornecedor.findMany({
      where: {
        quantidade_lotes: {
          gte: 1,
        },
      },
      take: 3,
      orderBy: {
        quantidade_lotes: 'desc',
      },
    });

    if (withLotes.length < 3) {
      const restantes = 3 - withLotes.length;
      const withoutLotes = await this.prisma.fornecedor.findMany({
        where: {
          quantidade_lotes: null,
        },
        take: restantes,
        orderBy: {
          createdAt: 'desc',
        },
      });
      return [...withLotes, ...withoutLotes];
    }

    return withLotes;
  }

  async getFornecedoresAtivos(): Promise<{ fornecedoresAtivos: number }> {
    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

    const quantity = await this.prisma.fornecedor.count(this.getFornecedoresAtivosSelect());

    return { fornecedoresAtivos: quantity };
  }

  async getFornecedoresValidos(): Promise<{ fornecedoresValidos: Fornecedor[] }> {
    const fornecedores = await this.prisma.fornecedor.findMany(this.getFornecedoresAtivosSelect());

    return { fornecedoresValidos: fornecedores };
  }

  getFornecedoresAtivosSelect() {
    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

    return {
      where: {
        ultima_entrada: {
          gte: twoMonthsAgo,
          not: null,
        },
      },
    };
  }
}
