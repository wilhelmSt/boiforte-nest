import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCompraRecorrenteDto, UpdateCompraRecorrenteDto } from './compra-recorrente.dto';
import { Prisma, CompraRecorrente } from '@prisma/client';

@Injectable()
export class CompraRecorrenteService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateCompraRecorrenteDto): Promise<CompraRecorrente> {
    const data: Prisma.CompraRecorrenteCreateInput = {
      tipoPagamento: createDto.tipoPagamento,
      condicaoPagamento: createDto.condicaoPagamento,
      valorTotal: createDto.valorTotal,
      valorTotalFinal: createDto.valorTotalFinal,
      desconto: createDto.desconto,
      descontoFinal: createDto.descontoFinal,
      observacao: createDto.observacao,
      cliente: { connect: { id: createDto.clienteId } },
    };

    return this.prisma.compraRecorrente.create({ data });
  }

  async findAll(): Promise<CompraRecorrente[]> {
    return this.prisma.compraRecorrente.findMany({
      orderBy: { createdAt: 'desc' },
      include: { cliente: true },
    });
  }

  async findOne(id: number): Promise<CompraRecorrente> {
    const compra = await this.prisma.compraRecorrente.findUnique({
      where: { id },
      include: { cliente: true },
    });

    if (!compra) {
      throw new NotFoundException(`Compra Recorrente com ID ${id} não encontrada`);
    }

    return compra;
  }

  async update(id: number, updateDto: UpdateCompraRecorrenteDto): Promise<CompraRecorrente> {
    await this.findOne(id);

    const data: Prisma.CompraRecorrenteUpdateInput = {
      ...updateDto,
      cliente: updateDto.clienteId ? { connect: { id: updateDto.clienteId } } : undefined,
    };

    return this.prisma.compraRecorrente.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id);
    await this.prisma.compraRecorrente.delete({ where: { id } });

    return { message: `Compra Recorrente com ID ${id} removida com sucesso.` };
  }
}
