import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateItemCompraDto, UpdateItemCompraDto } from './item-compra.dto';
import { Prisma, ItemCompra } from '@prisma/client';

@Injectable()
export class ItemCompraService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateItemCompraDto): Promise<ItemCompra> {
    const data: Prisma.ItemCompraCreateInput = {
      quantidade: createDto.quantidade,
      preco: createDto.preco,
      desconto: createDto.desconto ?? 0,
      total: createDto.total,
      compra: { connect: { id: createDto.compraId } },
      produto: { connect: { id: createDto.produtoId } },
    };

    return this.prisma.itemCompra.create({ data });
  }

  async findAll(): Promise<ItemCompra[]> {
    return this.prisma.itemCompra.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number): Promise<ItemCompra> {
    const item = await this.prisma.itemCompra.findUnique({ where: { id } });

    if (!item) {
      throw new NotFoundException(`ItemCompra com ID ${id} não encontrado`);
    }

    return item;
  }

  async update(id: number, updateDto: UpdateItemCompraDto): Promise<ItemCompra> {
    await this.findOne(id);

    const data: Prisma.ItemCompraUpdateInput = {
      ...updateDto,
      compra: updateDto.compraId ? { connect: { id: updateDto.compraId } } : undefined,
      produto: updateDto.produtoId ? { connect: { id: updateDto.produtoId } } : undefined,
    };

    return this.prisma.itemCompra.update({ where: { id }, data });
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id);
    await this.prisma.itemCompra.delete({ where: { id } });

    return { message: `ItemCompra com ID ${id} removido com sucesso.` };
  }
}
