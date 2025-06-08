import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

export const CurrentClient = createParamDecorator((data: keyof PrismaClient, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const client = request.user;

  return data ? client[data] : client;
});
