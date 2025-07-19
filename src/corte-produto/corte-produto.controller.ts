import { Controller, Get, Post, Body, Param, Put, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { CorteProdutoService } from './corte-produto.service';
import { CreateCorteProdutoDto, UpdateCorteProdutoDto } from './corte-produto.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('categoria-produto')
@Controller('categoria-produto')
export class CorteProdutoController {
  constructor(private readonly service: CorteProdutoService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo corte de produto' })
  @ApiResponse({ status: 201, description: 'Corte criado com sucesso' })
  create(@Body() createCorteProdutoDto: CreateCorteProdutoDto) {
    return this.service.create(createCorteProdutoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os cortes de produto' })
  findAll() {
    return this.service.findAll();
  }

  @Get('search')
  @ApiOperation({ summary: 'Busca cortes de produto por termo' })
  search(@Query('q') query: string) {
    return this.service.search(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um corte de produto pelo ID' })
  @ApiResponse({ status: 404, description: 'Corte não encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um corte de produto' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCorteProdutoDto: UpdateCorteProdutoDto) {
    return this.service.update(id, updateCorteProdutoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um corte de produto' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
