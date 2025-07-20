import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEspecieProdutoDto, UpdateEspecieProdutoDto } from './especie-produto.dto';
import { Prisma } from '@prisma/client';

type EspecieProduto = Prisma.EspecieProdutoGetPayload<object>;
type EspecieProdutowithCorte = Prisma.EspecieProdutoGetPayload<{
  select: {
    id: true;
    nome: true;
    descricao: true;
    corteProduto: { select: { id: true; nome: true; descricao: true } };
  };
}>;

@Injectable()
export class EspecieProdutoService {
  constructor(private prisma: PrismaService) {}

  async create(createTipoProdutoDto: CreateEspecieProdutoDto): Promise<EspecieProduto> {
    const data: Prisma.EspecieProdutoCreateInput = {
      nome: createTipoProdutoDto.nome,
      descricao: createTipoProdutoDto.descricao,
    };

    return this.prisma.especieProduto.create({ data });
  }

  async findAll(): Promise<EspecieProduto[]> {
    return this.prisma.especieProduto.findMany({
      orderBy: { nome: 'asc' },
    });
  }

  async findAllWithCorte(): Promise<EspecieProdutowithCorte[]> {
    return this.prisma.especieProduto.findMany({
      orderBy: { nome: 'asc' },
      select: {
        id: true,
        nome: true,
        descricao: true,
        corteProduto: {
          select: {
            id: true,
            nome: true,
            descricao: true,
          },
        },
      },
    });
  }

  async findOne(id: number): Promise<EspecieProduto> {
    const tipo = await this.prisma.especieProduto.findUnique({ where: { id } });

    if (!tipo) throw new NotFoundException(`EspecieProduto com ID ${id} não encontrado`);

    return tipo;
  }

  async update(id: number, updateEspecieProdutoDto: UpdateEspecieProdutoDto): Promise<EspecieProduto> {
    await this.findOne(id);

    return this.prisma.especieProduto.update({
      where: { id },
      data: updateEspecieProdutoDto,
    });
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id);
    await this.prisma.especieProduto.delete({ where: { id } });

    return { message: `EspecieProduto com ID ${id} removido com sucesso.` };
  }

  async search(
    query: string,
    page: number,
    limit: number,
    orderBy: string,
    orderDirection: 'asc' | 'desc'
  ): Promise<{
    data: {
      idEspecie: number;
      nomeEspecie: string;
      idCorte: number;
      nomeCorte: string;
    }[];
    total: number;
    pages: number;
  }> {
    const validOrderFields = ['idEspecie', 'nomeEspecie', 'idCorte', 'nomeCorte'];
    const sortField = validOrderFields.includes(orderBy) ? orderBy : 'nome';

    const whereCondition: Prisma.CorteProdutoWhereInput = query?.trim()
      ? {
          OR: [
            { nome: { contains: query, mode: 'insensitive' } },
            {
              especieProduto: {
                nome: { contains: query, mode: 'insensitive' },
              },
            },
          ],
        }
      : {};

    const [cortes, total] = await Promise.all([
      this.prisma.corteProduto.findMany({
        where: whereCondition,
        include: {
          especieProduto: true,
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          [sortField]: orderDirection,
        },
      }),
      this.prisma.corteProduto.count({ where: whereCondition }),
    ]);

    const formattedData = cortes.map((corte) => ({
      idEspecie: corte.especieProduto.id,
      nomeEspecie: corte.especieProduto.nome,
      idCorte: corte.id,
      nomeCorte: corte.nome,
    }));

    return {
      data: formattedData,
      total,
      pages: Math.ceil(total / limit),
    };
  }
}
