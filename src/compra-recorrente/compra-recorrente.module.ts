import { Module } from '@nestjs/common';
import { CompraRecorrenteService } from './compra-recorrente.service';
import { CompraRecorrenteController } from './compra-recorrente.controller';

@Module({
  providers: [CompraRecorrenteService],
  controllers: [CompraRecorrenteController]
})
export class CompraRecorrenteModule {}
