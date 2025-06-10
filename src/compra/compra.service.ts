import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCompraDto, UpdateCompraDto } from './compra.dto';
import { Prisma, Compra } from '@prisma/client';

@Injectable()
export class CompraService {
  constructor(private prisma: PrismaService) {}

  async create(createCompraDto: CreateCompraDto): Promise<Compra> {
    const data: Prisma.CompraCreateInput = {
      tipoPagamento: createCompraDto.tipoPagamento,
      condicaoPagamento: createCompraDto.condicaoPagamento,
      status: createCompraDto.status,
      valorTotal: createCompraDto.valorTotal,
      valorTotalFinal: createCompraDto.valorTotalFinal,
      desconto: createCompraDto.desconto,
      descontoFinal: createCompraDto.descontoFinal,
      observacao: createCompraDto.observacao,
      nfeNumero: createCompraDto.nfeNumero,
      nfeChave: createCompraDto.nfeChave,
      cliente: { connect: { id: createCompraDto.clienteId } },
    };

    return this.prisma.compra.create({ data });
  }

  async findAll(): Promise<Compra[]> {
    return this.prisma.compra.findMany({
      orderBy: { createdAt: 'desc' },
      include: { cliente: true },
    });
  }

  async findOne(id: number): Promise<Compra> {
    const compra = await this.prisma.compra.findUnique({
      where: { id },
      include: { cliente: true },
    });

    if (!compra) {
      throw new NotFoundException(`Compra com ID ${id} não encontrada`);
    }

    return compra;
  }

  async update(id: number, updateCompraDto: UpdateCompraDto): Promise<Compra> {
    await this.findOne(id);

    const data: Prisma.CompraUpdateInput = {
      ...updateCompraDto,
      cliente: updateCompraDto.clienteId ? { connect: { id: updateCompraDto.clienteId } } : undefined,
    };

    return this.prisma.compra.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id);
    await this.prisma.compra.delete({ where: { id } });

    return { message: `Compra com ID ${id} removida com sucesso.` };
  }
}
