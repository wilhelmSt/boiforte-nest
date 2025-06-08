import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async validateClient(email: string, password: string): Promise<Omit<PrismaClient, 'password'> | null> {
    const client = await this.prisma.client.findUnique({ where: { email } });

    if (client && (await bcrypt.compare(password, client.password))) {
      const { password, ...result } = client;
      return result;
    }
    return null;
  }

  async login(client: PrismaClient) {
    const payload = {
      email: client.email,
      sub: client.id,
      role: client.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      client: {
        id: client.id,
        name: client.name,
        email: client.email,
        role: client.role,
      },
    };
  }

  async getClientFromToken(token: string) {
    try {
      const payload = this.jwtService.verify(token.replace('Bearer ', ''));
      return await this.prisma.client.findUnique({
        where: { id: payload.sub },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          // Adicione outros campos necessários
        },
      });
    } catch (e) {
      return null;
    }
  }
}
