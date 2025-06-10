import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, ItemCompraRecorrente } from '@prisma/client';
import { CreateItemCompraRecorrenteDto, UpdateItemCompraRecorrenteDto } from './item-compra-recorrente.dto';

@Injectable()
export class ItemCompraRecorrenteService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateItemCompraRecorrenteDto): Promise<ItemCompraRecorrente> {
    const data: Prisma.ItemCompraRecorrenteCreateInput = {
      quantidade: createDto.quantidade,
      preco: createDto.preco,
      desconto: createDto.desconto ?? 0,
      total: createDto.total,
      compraRecorrente: { connect: { id: createDto.compraRecorrenteId } },
      produto: { connect: { id: createDto.produtoId } },
    };

    return this.prisma.itemCompraRecorrente.create({ data });
  }

  async findAll(): Promise<ItemCompraRecorrente[]> {
    return this.prisma.itemCompraRecorrente.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number): Promise<ItemCompraRecorrente> {
    const item = await this.prisma.itemCompraRecorrente.findUnique({ where: { id } });

    if (!item) {
      throw new NotFoundException(`ItemCompraRecorrente com ID ${id} não encontrado`);
    }

    return item;
  }

  async update(id: number, updateDto: UpdateItemCompraRecorrenteDto): Promise<ItemCompraRecorrente> {
    await this.findOne(id);

    const data: Prisma.ItemCompraRecorrenteUpdateInput = {
      ...updateDto,
      compraRecorrente: updateDto.compraRecorrenteId ? { connect: { id: updateDto.compraRecorrenteId } } : undefined,
      produto: updateDto.produtoId ? { connect: { id: updateDto.produtoId } } : undefined,
    };

    return this.prisma.itemCompraRecorrente.update({ where: { id }, data });
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id);
    await this.prisma.itemCompraRecorrente.delete({ where: { id } });

    return { message: `ItemCompraRecorrente com ID ${id} removido com sucesso.` };
  }
}
