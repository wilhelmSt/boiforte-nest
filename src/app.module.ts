import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { FornecedorModule } from './fornecedor/fornecedor.module';
import { EspecieProdutoModule } from './especie-produto/especie-produto.module';
import { CorteProdutoModule } from './corte-produto/corte-produto.module';
import { ProdutoModule } from './produto/produto.module';
import { LoteModule } from './lote/lote.module';
import { ClienteModule } from './cliente/cliente.module';
import { CompraModule } from './compra/compra.module';
import { CompraRecorrenteModule } from './compra-recorrente/compra-recorrente.module';
import { LogsModule } from './logs-db/logs.module';
import { ConfiguracaoModule } from './configuracao/configuracao.module';
import { ItemCompraModule } from './item-compra/item-compra.module';
import { ItemCompraRecorrenteModule } from './item-compra-recorrente/item-compra-recorrente.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    FornecedorModule,
    EspecieProdutoModule,
    CorteProdutoModule,
    ProdutoModule,
    LoteModule,
    ClienteModule,
    CompraModule,
    CompraRecorrenteModule,
    LogsModule,
    ConfiguracaoModule,
    ItemCompraModule,
    ItemCompraRecorrenteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
