import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLoteDto, UpdateLoteDto } from './lote.dto';
import { Prisma, Lote } from '@prisma/client';
import dayjs from 'dayjs';

@Injectable()
export class LoteService {
  constructor(private prisma: PrismaService) {}

  async search(
    query: string,
    page: number,
    limit: number,
    orderBy: string,
    orderDirection: 'asc' | 'desc'
  ): Promise<{ data: Lote[]; total: number; pages: number }> {
    const validOrderFields = ['vencimento', 'quantidade', 'status'];
    const sortField = validOrderFields.includes(orderBy) ? orderBy : 'vencimento';

    const whereCondition: Prisma.LoteWhereInput = query?.trim()
      ? {
          OR: [
            {
              fornecedor: {
                nome: {
                  contains: query,
                  mode: 'insensitive',
                },
              },
            },
            {
              produto: {
                is: {
                  corte: {
                    is: {
                      nome: {
                        contains: query,
                        mode: 'insensitive',
                      },
                    },
                  },
                },
              },
            },
            {
              produto: {
                is: {
                  corte: {
                    is: {
                      especieProduto: {
                        is: {
                          nome: {
                            contains: query,
                            mode: 'insensitive',
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          ],
        }
      : {};

    const [lotes, total] = await Promise.all([
      this.prisma.lote.findMany({
        where: whereCondition,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          [sortField]: orderDirection,
        },
        include: {
          fornecedor: true,
          produto: {
            include: {
              corte: {
                include: {
                  especieProduto: {
                    select: {
                      nome: true,
                    },
                  },
                },
              },
            },
          },
        },
      }),
      this.prisma.lote.count({
        where: whereCondition,
      }),
    ]);

    return {
      data: lotes,
      total,
      pages: Math.ceil(total / limit),
    };
  }

  async getTopClosestToExpiringLotes(): Promise<Lote[]> {
    const hoje = new Date();
    const doisMesesDepois = dayjs(hoje).add(2, 'month').toDate();

    const proximosVencimentos = await this.prisma.lote.findMany({
      where: {
        vencimento: {
          gte: hoje,
          lte: doisMesesDepois,
        },
      },
      take: 3,
      orderBy: {
        vencimento: 'asc',
      },
      include: {
        produto: {
          include: {
            corte: {
              include: {
                especieProduto: {
                  select: {
                    nome: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return proximosVencimentos;
  }

  async getTopVencidosLotes(): Promise<Lote[]> {
    const vencidos = await this.prisma.lote.findMany({
      where: {
        vencimento: {
          lt: new Date().toISOString(),
        },
      },
      take: 3,
      orderBy: {
        vencimento: 'asc',
      },
      include: {
        produto: {
          include: {
            corte: {
              include: {
                especieProduto: {
                  select: {
                    nome: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return vencidos;
  }

  async findProductsByCorteId(corteId: number): Promise<{ id: number }> {
    const product = await this.prisma.produto.findFirst({
      where: {
        corteId: corteId,
      },
      select: {
        id: true,
      },
    });

    if (!product) {
      throw new NotFoundException(`Produto associado com Corte de ID ${corteId} não encontrado`);
    }

    return product;
  }

  async create(createLoteDto: CreateLoteDto): Promise<Lote> {
    const { corteId, fornecedorId, descricao, quantidade = 1, vencimento, custoUnitario, custoTotal } = createLoteDto;

    const produtoId = (await this.findProductsByCorteId(corteId))?.id;

    const data: Prisma.LoteCreateInput = {
      quantidade,
      descricao,
      custoUnitario,
      custoTotal,
      vencimento: new Date(vencimento),
      produto: { connect: { id: produtoId } },
      fornecedor: { connect: { id: fornecedorId } },
    };

    const lote = await this.prisma.lote.create({ data });

    await this.prisma.produto.update({
      where: { id: produtoId },
      data: { estoque: { increment: quantidade } },
    });

    await this.prisma.fornecedor.update({
      where: { id: fornecedorId },
      data: {
        quantidade_lotes: { increment: 1 },
        ultima_entrada: new Date(),
      },
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

    const produtoId = (await this.findProductsByCorteId(updateLoteDto.corteId))?.id;

    const data: Prisma.LoteUpdateInput = {
      ...updateLoteDto,
      vencimento: updateLoteDto.vencimento ? new Date(updateLoteDto.vencimento) : undefined,
      produto: produtoId ? { connect: { id: produtoId } } : undefined,
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
