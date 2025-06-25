import { Controller, Get, Post, Body, Param, Put, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { TipoProdutoService } from './tipo-produto.service';
import { CreateTipoProdutoDto, UpdateTipoProdutoDto } from './tipo-produto.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('tipo-produto')
@Controller('tipo-produto')
export class TipoProdutoController {
  constructor(private readonly service: TipoProdutoService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo tipo de produto' })
  @ApiResponse({ status: 201, description: 'Tipo de produto criado com sucesso' })
  create(@Body() createTipoProdutoDto: CreateTipoProdutoDto) {
    return this.service.create(createTipoProdutoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os tipos de produto' })
  findAll() {
    return this.service.findAll();
  }

  @Get('search')
  @ApiOperation({ summary: 'Busca tipos de produto por termo' })
  search(@Query('q') query: string) {
    return this.service.search(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um tipo de produto pelo ID' })
  @ApiResponse({ status: 404, description: 'Tipo de produto não encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um tipo de produto' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateTipoProdutoDto: UpdateTipoProdutoDto) {
    return this.service.update(id, updateTipoProdutoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um tipo de produto' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
