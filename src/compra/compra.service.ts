import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCompraDto } from './compra.dto';
import { Compra } from '@prisma/client';
import { CreateItemCompraDto } from 'src/item-compra/item-compra.dto';
import dayjs from 'dayjs';

@Injectable()
export class CompraService {
  constructor(private prisma: PrismaService) {}

  private async validarItensCompra(itens: CreateItemCompraDto[], prisma: any) {
    const produtos = await prisma.produto.findMany({
      where: { id: { in: itens.map((i) => i.produtoId) } },
      select: { id: true, estoque: true },
    });

    for (const item of itens) {
      const produto = produtos.find((p) => p.id === item.produtoId);

      if (!produto) {
        throw new BadRequestException(`Produto com ID ${item.produtoId} não encontrado`);
      }

      if (produto.estoque < item.quantidade) {
        throw new BadRequestException(
          `Estoque insuficiente para ${produto.nome}. Estoque: ${produto.estoque}, solicitado: ${item.quantidade}`
        );
      }
    }
  }

  async create(createCompraDto: CreateCompraDto) {
    return this.prisma.$transaction(async (prisma) => {
      await this.validarItensCompra(createCompraDto.itens, prisma);

      const compra = await prisma.compra.create({
        data: {
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
          clienteId: createCompraDto.clienteId,
          itens: {
            createMany: {
              data: createCompraDto.itens.map((item) => ({
                produtoId: item.produtoId,
                quantidade: item.quantidade,
                preco: item.preco,
                desconto: item.desconto,
                total: item.total,
              })),
            },
          },
        },
        include: {
          itens: true,
        },
      });

      await Promise.all(
        createCompraDto.itens.map((item) =>
          prisma.produto.update({
            where: { id: item.produtoId },
            data: { estoque: { decrement: item.quantidade } },
          })
        )
      );

      const cliente = await prisma.cliente.findFirst({
        where: {
          id: createCompraDto.clienteId,
        },
        select: {
          quantidade_pedidos: true,
        },
      });

      await prisma.cliente.update({
        where: { id: createCompraDto.clienteId },
        data: {
          quantidade_pedidos: (cliente?.quantidade_pedidos || 0) + 1,
          ultimo_pedido: dayjs().toISOString(),
        },
      });

      return compra;
    });
  }

  async findAll(): Promise<Compra[]> {
    return this.prisma.compra.findMany({
      orderBy: { createdAt: 'desc' },
      include: { cliente: true },
    });
  }

  async countAll(): Promise<number> {
    return this.prisma.compra.count({
      orderBy: { createdAt: 'desc' },
    });
  }

  async countAllDay(dateStr: string): Promise<number> {
    const date = dayjs(dateStr);

    if (!date.isValid()) {
      throw new BadRequestException('Invalid date format. Use YYYY-MM-DD.');
    }

    const startOfDay = date.startOf('day').toDate();
    const endOfDay = date.endOf('day').toDate();

    return this.prisma.compra.count({
      where: {
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
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

  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id);
    await this.prisma.compra.delete({ where: { id } });

    return { message: `Compra com ID ${id} removida com sucesso.` };
  }
}
