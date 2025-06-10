import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateConfiguracaoDto, UpdateConfiguracaoDto } from './configuracao.dto';
import { Prisma, Configuracao } from '@prisma/client';

@Injectable()
export class ConfiguracaoService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateConfiguracaoDto): Promise<Configuracao> {
    const data: Prisma.ConfiguracaoCreateInput = {
      chave: createDto.chave,
      valor: createDto.valor,
      descricao: createDto.descricao,
    };

    return this.prisma.configuracao.create({ data });
  }

  async findAll(): Promise<Configuracao[]> {
    return this.prisma.configuracao.findMany({
      orderBy: { chave: 'asc' },
    });
  }

  async findOne(id: number): Promise<Configuracao> {
    const config = await this.prisma.configuracao.findUnique({ where: { id } });

    if (!config) {
      throw new NotFoundException(`Configuração com ID ${id} não encontrada`);
    }

    return config;
  }

  async update(id: number, updateDto: UpdateConfiguracaoDto): Promise<Configuracao> {
    await this.findOne(id);

    const data: Prisma.ConfiguracaoUpdateInput = { ...updateDto };

    return this.prisma.configuracao.update({ where: { id }, data });
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id);
    await this.prisma.configuracao.delete({ where: { id } });

    return { message: `Configuração com ID ${id} removida com sucesso.` };
  }
}
