import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProdutoDto, UpdateProdutoDto } from './produto.dto';
import { Prisma } from 'generated/prisma';

type Produto = Prisma.ProdutoGetPayload<object>;

@Injectable()
export class ProdutoService {
  constructor(private prisma: PrismaService) {}

  async create(createProdutoDto: CreateProdutoDto): Promise<Produto> {
    const data: Prisma.ProdutoCreateInput = {
      nome: createProdutoDto?.nome,
      codigo: createProdutoDto?.codigo,
      descricao: createProdutoDto?.descricao,
      precoPadrao: createProdutoDto?.precoPadrao,
      estoqueMinimo: createProdutoDto?.estoqueMinimo,
      estoque: createProdutoDto?.estoque,
      unidadeMedida: createProdutoDto?.unidadeMedida,
      promocao: createProdutoDto?.promocao,
      precoPromocional: createProdutoDto?.precoPromocional,
      descontoAtacado: createProdutoDto?.descontoAtacado,
      precoAtacado: createProdutoDto?.precoAtacado,
      quantidadeAtacado: createProdutoDto?.quantidadeAtacado,
      imagem: createProdutoDto?.imagem,
      categoria: {
        connect: { id: createProdutoDto.categoriaId },
      },
    };

    return this.prisma.produto.create({ data });
  }

  async findAll(): Promise<Produto[]> {
    return this.prisma.produto.findMany({
      orderBy: { nome: 'asc' },
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
    const { categoriaId, ...rest } = updateProdutoDto;

    return this.prisma.produto.update({
      where: { id },
      data: {
        ...rest,
        ...(categoriaId && { categoria: { connect: { id: categoriaId } } }),
      },
    });
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id);
    await this.prisma.produto.delete({ where: { id } });
    return { message: `Produto com ID ${id} removido com sucesso.` };
  }

  async search(query: string): Promise<Produto[]> {
    if (!query?.trim()) return [];
    return this.prisma.produto.findMany({
      where: {
        OR: [
          { nome: { contains: query, mode: 'insensitive' } },
          { descricao: { contains: query, mode: 'insensitive' } },
          { codigo: { contains: query, mode: 'insensitive' } },
        ],
      },
      orderBy: { nome: 'asc' },
    });
  }
}
