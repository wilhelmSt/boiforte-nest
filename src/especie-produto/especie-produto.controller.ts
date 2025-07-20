import { Controller, Get, Post, Body, Param, Put, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { EspecieProdutoService } from './especie-produto.service';
import { CreateEspecieProdutoDto, UpdateEspecieProdutoDto } from './especie-produto.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('especie-produto')
@Controller('especie-produto')
export class EspecieProdutoController {
  constructor(private readonly service: EspecieProdutoService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo especie de produto' })
  @ApiResponse({ status: 201, description: 'Espécie de produto criado com sucesso' })
  create(@Body() createEspecieProdutoDto: CreateEspecieProdutoDto) {
    return this.service.create(createEspecieProdutoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos as espécies de produto' })
  findAll() {
    return this.service.findAll();
  }

  @Get('cortes')
  @ApiOperation({ summary: 'Lista todos as espécies de produto com os cortes' })
  findAllWithCortes() {
    return this.service.findAllWithCorte();
  }

  @Get('search')
  @ApiOperation({ summary: 'Busca espécies de produto por termo' })
  search(
    @Query('q') query: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('orderBy') orderBy = 'nome',
    @Query('orderDirection') orderDirection: 'asc' | 'desc' = 'asc'
  ) {
    return this.service.search(query, +page, +limit, orderBy, orderDirection);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca uma espécia de produto pelo ID' })
  @ApiResponse({ status: 404, description: 'Espécie de produto não encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza uma espécie de produto' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateEspecieProdutoDto: UpdateEspecieProdutoDto) {
    return this.service.update(id, updateEspecieProdutoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove uma espécie de produto' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
