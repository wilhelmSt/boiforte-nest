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

@Module({
  imports: [PrismaModule, AuthModule, UserModule, FornecedorModule, TipoProdutoModule, CategoriaProdutoModule, ProdutoModule],
  controllers: [AppController, FornecedorController, CategoriaProdutoController],
  providers: [AppService, UserService, FornecedorService, CategoriaProdutoService],
})
export class AppModule {}
