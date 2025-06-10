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

@Module({
  imports: [PrismaModule, AuthModule, UserModule, FornecedorModule, TipoProdutoModule],
  controllers: [AppController, FornecedorController],
  providers: [AppService, UserService, FornecedorService],
})
export class AppModule {}
