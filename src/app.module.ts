import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { FornecedorController } from './fornecedor/fornecedor.controller';
import { FornecedorService } from './fornecedor/fornecedor.service';
import { FornecedorModule } from './fornecedor/fornecedor.module';
import { TipoProdutoModule } from './tipo-produto/tipo-produto.module';
import { CategoriaProdutoService } from './categoria-produto/categoria-produto.service';
import { CategoriaProdutoController } from './categoria-produto/categoria-produto.controller';
import { CategoriaProdutoModule } from './categoria-produto/categoria-produto.module';
import { ProdutoModule } from './produto/produto.module';
import { LoteService } from './lote/lote.service';
import { LoteController } from './lote/lote.controller';
import { LoteModule } from './lote/lote.module';
import { ClienteModule } from './cliente/cliente.module';
import { CompraModule } from './compra/compra.module';
import { CompraRecorrenteModule } from './compra-recorrente/compra-recorrente.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, FornecedorModule, TipoProdutoModule, CategoriaProdutoModule, ProdutoModule, LoteModule, ClienteModule, CompraModule, CompraRecorrenteModule],
  controllers: [AppController, FornecedorController, CategoriaProdutoController, LoteController],
  providers: [AppService, UserService, FornecedorService, CategoriaProdutoService, LoteService],
})
export class AppModule {}
