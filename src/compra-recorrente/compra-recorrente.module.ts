import { Module } from '@nestjs/common';
import { CompraRecorrenteService } from './compra-recorrente.service';
import { CompraRecorrenteController } from './compra-recorrente.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CompraRecorrenteController],
  providers: [CompraRecorrenteService],
  exports: [CompraRecorrenteService],
})
export class CompraRecorrenteModule {}
