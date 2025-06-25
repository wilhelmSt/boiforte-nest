import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLogsDto, UpdateLogsDto } from './logs.dto';
import { Prisma, Logs } from '@prisma/client';

@Injectable()
export class LogsService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateLogsDto): Promise<Logs> {
    const data: Prisma.LogsCreateInput = {
      categoria: createDto.categoria,
      tipo: createDto.tipo,
      descricao: createDto.descricao,
      request: createDto.request,
      response: createDto.response,
    };

    return this.prisma.logs.create({ data });
  }

  async findAll(): Promise<Logs[]> {
    return this.prisma.logs.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async findOne(id: number): Promise<Logs> {
    const log = await this.prisma.logs.findUnique({ where: { id } });

    if (!log) {
      throw new NotFoundException(`Log com ID ${id} não encontrado`);
    }

    return log;
  }

  async update(id: number, updateDto: UpdateLogsDto): Promise<Logs> {
    await this.findOne(id);

    const data: Prisma.LogsUpdateInput = { ...updateDto };

    return this.prisma.logs.update({ where: { id }, data });
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id);
    await this.prisma.logs.delete({ where: { id } });

    return { message: `Log com ID ${id} removido com sucesso.` };
  }
}
