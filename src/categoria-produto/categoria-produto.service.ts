import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoriaProdutoDto, UpdateCategoriaProdutoDto } from './categoria-produto.dto';
import { Prisma } from 'generated/prisma';

type CategoriaProduto = Prisma.CategoriaProdutoGetPayload<object>;

@Injectable()
export class CategoriaProdutoService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoriaProdutoDto: CreateCategoriaProdutoDto): Promise<CategoriaProduto> {
    const data: Prisma.CategoriaProdutoCreateInput = {
      nome: createCategoriaProdutoDto.nome,
      descricao: createCategoriaProdutoDto.descricao,
      tipoProduto: {
        connect: { id: createCategoriaProdutoDto.tipoProdutoId },
      },
    };

    return this.prisma.categoriaProduto.create({ data });
  }

  async findAll(): Promise<CategoriaProduto[]> {
    return this.prisma.categoriaProduto.findMany({
      orderBy: { nome: 'asc' },
      include: { tipoProduto: true },
    });
  }

  async findOne(id: number): Promise<CategoriaProduto> {
    const item = await this.prisma.categoriaProduto.findUnique({
      where: { id },
      include: { tipoProduto: true },
    });

    if (!item) throw new NotFoundException(`CategoriaProduto com ID ${id} não encontrado`);

    return item;
  }

  async update(id: number, dto: UpdateCategoriaProdutoDto): Promise<CategoriaProduto> {
    await this.findOne(id);

    return this.prisma.categoriaProduto.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id);
    await this.prisma.categoriaProduto.delete({ where: { id } });

    return { message: `CategoriaProduto com ID ${id} removido com sucesso.` };
  }

  async search(query: string): Promise<CategoriaProduto[]> {
    if (!query?.trim()) return [];

    return this.prisma.categoriaProduto.findMany({
      where: {
        nome: { contains: query, mode: 'insensitive' },
      },
      orderBy: { nome: 'asc' },
    });
  }
}
