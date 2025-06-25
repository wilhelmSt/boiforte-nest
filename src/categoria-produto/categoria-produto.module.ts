import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CategoriaProdutoController } from './categoria-produto.controller';
import { CategoriaProdutoService } from './categoria-produto.service';

@Module({
  imports: [PrismaModule],
  controllers: [CategoriaProdutoController],
  providers: [CategoriaProdutoService],
  exports: [CategoriaProdutoService],
})
export class CategoriaProdutoModule {}
