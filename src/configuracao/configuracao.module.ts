import { Module } from '@nestjs/common';
import { ConfiguracaoService } from './configuracao.service';
import { ConfiguracaoController } from './configuracao.controller';

@Module({
  providers: [ConfiguracaoService],
  controllers: [ConfiguracaoController]
})
export class ConfiguracaoModule {}
