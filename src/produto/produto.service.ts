import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProdutoDto, UpdateProdutoDto } from './produto.dto';
import { Prisma } from '@prisma/client';

type Produto = Prisma.ProdutoGetPayload<object>;

@Injectable()
export class ProdutoService {
  constructor(private prisma: PrismaService) {}

  async create(createProdutoDto: CreateProdutoDto): Promise<Produto> {
    const produtoExistente = await this.prisma.produto.findFirst({
      where: {
        corteId: createProdutoDto.corteId,
      },
    });

    if (produtoExistente) {
      throw new ConflictException('Já existe um produto cadastrado para este corte');
    }

    const data: Prisma.ProdutoCreateInput = {
      codigo: createProdutoDto?.codigo,
      descricao: createProdutoDto?.descricao,
      precoPadrao: createProdutoDto?.precoPadrao,
      estoqueMinimo: createProdutoDto?.estoqueMinimo,
      promocao: createProdutoDto?.promocao,
      precoPromocional: createProdutoDto?.precoPromocional,
      descontoAtacado: createProdutoDto?.descontoAtacado,
      precoAtacado: createProdutoDto?.precoAtacado,
      quantidadeAtacado: createProdutoDto?.quantidadeAtacado,
      imagem: createProdutoDto?.imagem,
      corte: {
        connect: { id: createProdutoDto.corteId },
      },
    };

    return this.prisma.produto.create({ data });
  }

  async findAll(): Promise<Produto[]> {
    return this.prisma.produto.findMany({
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number): Promise<Produto> {
    const produto = await this.prisma.produto.findUnique({
      where: { id },
    });
    if (!produto) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado`);
    }
    return produto;
  }

  async update(id: number, updateProdutoDto: UpdateProdutoDto): Promise<Produto> {
    await this.findOne(id);
    const { corteId, ...rest } = updateProdutoDto;

    return this.prisma.produto.update({
      where: { id },
      data: {
        ...rest,
        ...(corteId && { corte: { connect: { id: corteId } } }),
      },
    });
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id);
    await this.prisma.produto.delete({ where: { id } });
    return { message: `Produto com ID ${id} removido com sucesso.` };
  }

  async findProdutosComEstoqueAbaixoMinimo() {
    return this.prisma.produto.findMany({
      where: {
        estoque: {
          lt: this.prisma.produto.fields.estoqueMinimo,
          gte: 0,
        },
      },
      take: 3,
      include: {
        corte: {
          select: {
            id: true,
            nome: true,
            especieProduto: {
              select: {
                id: true,
                nome: true,
              },
            },
          },
        },
      },
      orderBy: {
        estoque: 'asc',
      },
    });
  }

  async findProdutosComEstoqueZerado() {
    return this.prisma.produto.findMany({
      where: {
        estoque: 0,
        estoqueMinimo: {
          gt: 0,
        },
      },
      take: 3,
      include: {
        corte: {
          select: {
            id: true,
            nome: true,
            especieProduto: {
              select: {
                id: true,
                nome: true,
              },
            },
          },
        },
      },
      orderBy: [
        {
          estoqueMinimo: 'desc',
        },
      ],
    });
  }

  async search(
    query: string,
    page: number,
    limit: number,
    orderBy: string,
    orderDirection: 'asc' | 'desc'
  ): Promise<{
    data: {
      id: number;
      estoque: number;
      estoqueMinimo: number;
      preco: number;
      vencimento: Date | null;
      corte: {
        id: number;
        nome: string;
        especie: {
          id: number;
          nome: string;
        };
      };
    }[];
    total: number;
    pages: number;
  }> {
    const validOrderFields = ['corte', 'especie', 'estoque', 'vencimento'];
    const sortField = validOrderFields.includes(orderBy) ? orderBy : 'corte';

    const whereCondition: Prisma.ProdutoWhereInput = query?.trim()
      ? {
          OR: [
            {
              corte: {
                nome: { contains: query, mode: 'insensitive' },
              },
            },
            {
              corte: {
                especieProduto: {
                  nome: { contains: query, mode: 'insensitive' },
                },
              },
            },
          ],
        }
      : {};

    const orderByConfig: any = {};

    switch (sortField) {
      case 'corte': {
        orderByConfig.corte = { nome: orderDirection };
        break;
      }

      case 'especie': {
        orderByConfig.corte = { especieProduto: { nome: orderDirection } };
        break;
      }

      case 'estoque': {
        orderByConfig.estoque = orderDirection;
        break;
      }

      case 'vencimento': {
        orderByConfig.lote = {
          _min: {
            vencimento: orderDirection,
          },
        };
        break;
      }

      default: {
        orderByConfig.corte = { nome: orderDirection };
        break;
      }
    }

    const [produtos, total] = await Promise.all([
      this.prisma.produto.findMany({
        where: whereCondition,
        include: {
          corte: {
            include: {
              especieProduto: true,
            },
          },
          lote: {
            orderBy: {
              vencimento: 'asc',
            },
            take: 1,
            select: {
              vencimento: true,
            },
          },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: orderByConfig,
      }),
      this.prisma.produto.count({ where: whereCondition }),
    ]);

    const formattedData = produtos.map((produto) => ({
      id: produto.id,
      estoque: produto.estoque,
      estoqueMinimo: produto.estoqueMinimo,
      preco: produto.precoPadrao,
      vencimento: produto.lote[0]?.vencimento || null,
      corte: {
        id: produto.corte.id,
        nome: produto.corte.nome,
        especie: {
          id: produto.corte.especieProduto.id,
          nome: produto.corte.especieProduto.nome,
        },
      },
    }));

    return {
      data: formattedData,
      total,
      pages: Math.ceil(total / limit),
    };
  }
}
