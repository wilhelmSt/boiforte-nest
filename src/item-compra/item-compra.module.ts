import { Module } from '@nestjs/common';
import { ItemCompraService } from './item-compra.service';
import { ItemCompraController } from './item-compra.controller';

@Module({
  providers: [ItemCompraService],
  controllers: [ItemCompraController]
})
export class ItemCompraModule {}
