import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

type User = Prisma.UserGetPayload<object>;

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async validateClient(email: string, password: string): Promise<Omit<User, 'password'> | null> {
    const client = await this.prisma.user.findUnique({ where: { email } });

    if (client && (await bcrypt.compare(password, client.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = client;
      return result;
    }
    return null;
  }

  async login(client: User) {
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
      return await this.prisma.user.findUnique({
        where: { id: payload.sub },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      return null;
    }
  }
}
