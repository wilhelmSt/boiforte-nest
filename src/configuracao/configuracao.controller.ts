import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { ConfiguracaoService } from './configuracao.service';
import { CreateConfiguracaoDto, UpdateConfiguracaoDto } from './configuracao.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('configuracao')
@Controller('configuracao')
export class ConfiguracaoController {
  constructor(private readonly configuracaoService: ConfiguracaoService) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma nova configuração' })
  create(@Body() createDto: CreateConfiguracaoDto) {
    return this.configuracaoService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todas as configurações' })
  findAll() {
    return this.configuracaoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtém uma configuração pelo ID' })
  @ApiResponse({ status: 404, description: 'Configuração não encontrada' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.configuracaoService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza uma configuração' })
  @ApiResponse({ status: 404, description: 'Configuração não encontrada' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateConfiguracaoDto) {
    return this.configuracaoService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove uma configuração' })
  @ApiResponse({ status: 404, description: 'Configuração não encontrada' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.configuracaoService.remove(id);
  }
}
