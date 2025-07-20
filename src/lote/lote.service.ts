import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLoteDto, UpdateLoteDto } from './lote.dto';
import { Prisma, Lote } from '@prisma/client';

@Injectable()
export class LoteService {
  constructor(private prisma: PrismaService) {}

  async create(createLoteDto: CreateLoteDto): Promise<Lote> {
    const { produtoId, fornecedorId, quantidade = 1, vencimento } = createLoteDto;

    const data: Prisma.LoteCreateInput = {
      quantidade,
      vencimento: new Date(vencimento),
      produto: { connect: { id: produtoId } },
      fornecedor: { connect: { id: fornecedorId } },
    };

    const lote = await this.prisma.lote.create({ data });

    // Atualiza o estoque do produto relacionado
    await this.prisma.produto.update({
      where: { id: produtoId },
      data: { estoque: { increment: quantidade } },
    });

    return lote;
  }

  async findAll(): Promise<Lote[]> {
    return this.prisma.lote.findMany({
      orderBy: { vencimento: 'asc' },
      include: { produto: true, fornecedor: true },
    });
  }

  async findOne(id: number): Promise<Lote> {
    const lote = await this.prisma.lote.findUnique({
      where: { id },
      include: { produto: true, fornecedor: true },
    });

    if (!lote) {
      throw new NotFoundException(`Lote com ID ${id} não encontrado`);
    }
    return lote;
  }

  async update(id: number, updateLoteDto: UpdateLoteDto): Promise<Lote> {
    await this.findOne(id);

    const data: Prisma.LoteUpdateInput = {
      ...updateLoteDto,
      vencimento: updateLoteDto.vencimento ? new Date(updateLoteDto.vencimento) : undefined,
      produto: updateLoteDto.produtoId ? { connect: { id: updateLoteDto.produtoId } } : undefined,
      fornecedor: updateLoteDto.fornecedorId ? { connect: { id: updateLoteDto.fornecedorId } } : undefined,
    };

    return this.prisma.lote.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id);

    await this.prisma.lote.delete({ where: { id } });

    return { message: `Lote com ID ${id} removido com sucesso.` };
  }
}
