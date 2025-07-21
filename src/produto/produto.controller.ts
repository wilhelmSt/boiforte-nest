import { Controller, Get, Post, Body, Param, Put, Delete, Query, ParseIntPipe, Res } from '@nestjs/common';
import { Response } from 'express';
import { ProdutoService } from './produto.service';
import { CreateProdutoDto, UpdateProdutoDto } from './produto.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReportService } from '../report/report.service';

@ApiTags('produto')
@Controller('produto')
export class ProdutoController {
constructor(
    private readonly produtoService: ProdutoService,
    private readonly reportService: ReportService,
  ) {}


  @Post()
  @ApiOperation({ summary: 'Cria um novo produto' })
  @ApiResponse({ status: 201, description: 'Produto criado com sucesso' })
  create(@Body() createProdutoDto: CreateProdutoDto) {
    return this.produtoService.create(createProdutoDto);
  }

@Get()
@ApiOperation({ summary: 'Lista todas as compras recorrentes' })
findAllComprasRecorrentes() {
  return this.produtoService.findAll();
}

 @Get('relatorio')
  @ApiOperation({ summary: 'Lista todos os produtos' })
  async findAll(
    @Query('format') format?: string,
    @Res() res?: Response,
  ) {
    const data = await this.produtoService.findAll();
    if (res && this.reportService.handleExport(format, 'produto', data, res)) {
      return;
    }
    return data;
  }


  @Get('search')
  @ApiOperation({ summary: 'Busca produtos por termo' })
  search(@Query('q') query: string) {
    return this.produtoService.search(query);
  }

   @Get('estoque-baixo')
  @ApiOperation({ summary: 'Lista produtos com estoque abaixo do mínimo' })
  listarEstoqueBaixo() {
    return this.produtoService.findLowStock();
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
