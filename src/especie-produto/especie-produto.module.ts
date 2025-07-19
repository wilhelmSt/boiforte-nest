import { Module } from '@nestjs/common';
import { EspecieProdutoController } from './especie-produto.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EspecieProdutoService } from './especie-produto.service';

@Module({
  imports: [PrismaModule],
  controllers: [EspecieProdutoController],
  providers: [EspecieProdutoService],
  exports: [EspecieProdutoService],
})
export class EspecieProdutoModule {}
