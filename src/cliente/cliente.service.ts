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

  async findAll(): Promise<Cliente[]> {
    return this.prisma.cliente.findMany({
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
}
