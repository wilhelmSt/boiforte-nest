import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ItemCompra } from '@prisma/client';

@Injectable()
export class ItemCompraService {
  constructor(private prisma: PrismaService) {}

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

  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id);
    await this.prisma.itemCompra.delete({ where: { id } });

    return { message: `ItemCompra com ID ${id} removido com sucesso.` };
  }
}
