import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CorteProdutoController } from './corte-produto.controller';
import { CorteProdutoService } from './corte-produto.service';

@Module({
  imports: [PrismaModule],
  controllers: [CorteProdutoController],
  providers: [CorteProdutoService],
  exports: [CorteProdutoService],
})
export class CorteProdutoModule {}
