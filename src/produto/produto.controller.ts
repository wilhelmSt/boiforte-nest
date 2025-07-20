import { Controller, Get, Post, Body, Param, Put, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { CreateProdutoDto, UpdateProdutoDto } from './produto.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('produto')
@Controller('produto')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo produto' })
  @ApiResponse({ status: 201, description: 'Produto criado com sucesso' })
  create(@Body() createProdutoDto: CreateProdutoDto) {
    return this.produtoService.create(createProdutoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os produtos' })
  findAll() {
    return this.produtoService.findAll();
  }

  @Get('search')
  @ApiOperation({ summary: 'Busca produtos por termo' })
  search(
    @Query('q') query: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('orderBy') orderBy = 'nome',
    @Query('orderDirection') orderDirection: 'asc' | 'desc' = 'asc'
  ) {
    return this.produtoService.search(query, +page, +limit, orderBy, orderDirection);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtém um produto pelo ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.produtoService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um produto' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProdutoDto: UpdateProdutoDto) {
    return this.produtoService.update(id, updateProdutoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um produto' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.produtoService.remove(id);
  }
}
