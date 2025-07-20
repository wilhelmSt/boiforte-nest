import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCorteProdutoDto, UpdateCorteProdutoDto } from './corte-produto.dto';
import { Prisma } from '@prisma/client';

type CorteProduto = Prisma.CorteProdutoGetPayload<object>;

@Injectable()
export class CorteProdutoService {
  constructor(private prisma: PrismaService) {}

  async create(createCorteProdutoDto: CreateCorteProdutoDto): Promise<CorteProduto> {
    const data: Prisma.CorteProdutoCreateInput = {
      nome: createCorteProdutoDto.nome,
      descricao: createCorteProdutoDto.descricao,
      especieProduto: {
        connect: { id: createCorteProdutoDto.especieProdutoId },
      },
    };

    return this.prisma.corteProduto.create({ data });
  }

  async findAll(): Promise<CorteProduto[]> {
    return this.prisma.corteProduto.findMany({
      orderBy: { nome: 'asc' },
      include: { especieProduto: true },
    });
  }

  async findOne(id: number): Promise<CorteProduto> {
    const item = await this.prisma.corteProduto.findUnique({
      where: { id },
      include: { especieProduto: true },
    });

    if (!item) throw new NotFoundException(`CorteProduto com ID ${id} não encontrado`);

    return item;
  }

  async update(id: number, dto: UpdateCorteProdutoDto): Promise<CorteProduto> {
    await this.findOne(id);

    return this.prisma.corteProduto.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id);
    await this.prisma.corteProduto.delete({ where: { id } });

    return { message: `CorteProduto com ID ${id} removido com sucesso.` };
  }

  async search(query: string): Promise<CorteProduto[]> {
    if (!query?.trim()) return [];

    return this.prisma.corteProduto.findMany({
      where: {
        nome: { contains: query, mode: 'insensitive' },
      },
      orderBy: { nome: 'asc' },
    });
  }
}
