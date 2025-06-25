import { Module } from '@nestjs/common';
import { ItemCompraRecorrenteService } from './item-compra-recorrente.service';
import { ItemCompraRecorrenteController } from './item-compra-recorrente.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ItemCompraRecorrenteController],
  providers: [ItemCompraRecorrenteService],
  exports: [ItemCompraRecorrenteService],
})
export class ItemCompraRecorrenteModule {}
