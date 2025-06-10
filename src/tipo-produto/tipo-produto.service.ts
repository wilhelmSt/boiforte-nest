import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from 'generated/prisma';
import { CreateTipoProdutoDto, UpdateTipoProdutoDto } from './tipo-produto.dto';

type TipoProduto = Prisma.TipoProdutoGetPayload<object>;

@Injectable()
export class TipoProdutoService {
  constructor(private prisma: PrismaService) {}

  async create(createTipoProdutoDto: CreateTipoProdutoDto): Promise<TipoProduto> {
    const data: Prisma.TipoProdutoCreateInput = {
      nome: createTipoProdutoDto.nome,
      descricao: createTipoProdutoDto.descricao,
    };

    return this.prisma.tipoProduto.create({ data });
  }

  async findAll(): Promise<TipoProduto[]> {
    return this.prisma.tipoProduto.findMany({
      orderBy: { nome: 'asc' },
    });
  }

  async findOne(id: number): Promise<TipoProduto> {
    const tipo = await this.prisma.tipoProduto.findUnique({ where: { id } });

    if (!tipo) throw new NotFoundException(`TipoProduto com ID ${id} não encontrado`);

    return tipo;
  }

  async update(id: number, updateTipoProdutoDto: UpdateTipoProdutoDto): Promise<TipoProduto> {
    await this.findOne(id);

    return this.prisma.tipoProduto.update({
      where: { id },
      data: updateTipoProdutoDto,
    });
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id);
    await this.prisma.tipoProduto.delete({ where: { id } });

    return { message: `TipoProduto com ID ${id} removido com sucesso.` };
  }

  async search(query: string): Promise<TipoProduto[]> {
    if (!query?.trim()) return [];

    return this.prisma.tipoProduto.findMany({
      where: {
        nome: { contains: query, mode: 'insensitive' },
      },
      orderBy: { nome: 'asc' },
    });
  }
}
