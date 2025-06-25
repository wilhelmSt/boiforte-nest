import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFornecedorDto, UpdateFornecedorDto } from './fornecedor.dto';
import { Prisma } from 'generated/prisma';

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

  async search(query: string): Promise<Fornecedor[]> {
    if (!query?.trim()) {
      return [];
    }

    return this.prisma.fornecedor.findMany({
      where: {
        OR: [
          { nome: { contains: query, mode: 'insensitive' } },
          { cnpj: { contains: query } },
          { email: { contains: query, mode: 'insensitive' } },
        ],
      },
      orderBy: {
        nome: 'asc',
      },
    });
  }
}
