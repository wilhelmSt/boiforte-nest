import { Controller, Get, Post, Body, Param, Put, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { CategoriaProdutoService } from './categoria-produto.service';
import { CreateCategoriaProdutoDto, UpdateCategoriaProdutoDto } from './categoria-produto.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('categoria-produto')
@Controller('categoria-produto')
export class CategoriaProdutoController {
  constructor(private readonly service: CategoriaProdutoService) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma nova categoria de produto' })
  @ApiResponse({ status: 201, description: 'Categoria criada com sucesso' })
  create(@Body() createCategoriaProdutoDto: CreateCategoriaProdutoDto) {
    return this.service.create(createCategoriaProdutoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todas as categorias de produto' })
  findAll() {
    return this.service.findAll();
  }

  @Get('search')
  @ApiOperation({ summary: 'Busca categorias de produto por termo' })
  search(@Query('q') query: string) {
    return this.service.search(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca uma categoria de produto pelo ID' })
  @ApiResponse({ status: 404, description: 'Categoria não encontrada' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza uma categoria de produto' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCategoriaProdutoDto: UpdateCategoriaProdutoDto) {
    return this.service.update(id, updateCategoriaProdutoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove uma categoria de produto' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
