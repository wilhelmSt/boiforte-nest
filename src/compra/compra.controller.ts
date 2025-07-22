import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { CompraService } from './compra.service';
import { CreateCompraDto } from './compra.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

@ApiTags('compra')
@Controller('compra')
export class CompraController {
  constructor(private readonly compraService: CompraService) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma nova compra' })
  @ApiResponse({ status: 201, description: 'Compra criada com sucesso' })
  create(@Body() createCompraDto: CreateCompraDto) {
    return this.compraService.create(createCompraDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todas as compras' })
  findAll() {
    return this.compraService.findAll();
  }

  @Get('search')
  @ApiOperation({ summary: 'Busca paginada de Compras por termo' })
  @ApiQuery({ name: 'q', required: false, description: 'Termo de busca' })
  @ApiQuery({ name: 'page', required: false, description: 'Página atual', example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: 'Itens por página', example: 10 })
  @ApiQuery({
    name: 'orderBy',
    required: false,
    description: 'Campo para ordenação (valorTotal, desconto, status, tipoPagamento, nfeNumero, nfeChave)',
    example: 'nome',
  })
  @ApiQuery({
    name: 'orderDirection',
    required: false,
    description: 'Direção da ordenação (asc ou desc)',
    example: 'asc',
  })
  async search(
    @Query('q') query: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('orderBy') orderBy = 'nome',
    @Query('orderDirection') orderDirection: 'asc' | 'desc' = 'asc'
  ) {
    return this.compraService.search(query, +page, +limit, orderBy, orderDirection);
  }

  @Get('count')
  @ApiOperation({ summary: 'Retorna a quantidade de todas as compras já feitas no sistema' })
  countAll() {
    return this.compraService.countAll();
  }

  @Get('count-day')
  @ApiOperation({ summary: 'Retorna a quantidade de todas as compras feeitas em um dia específico' })
  @ApiQuery({ name: 'date', required: true, description: 'Data no formato YYYY-MM-DD' })
  countAllDay(@Query('date') date: string) {
    return this.compraService.countAllDay(date);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtém uma compra pelo ID' })
  @ApiResponse({ status: 404, description: 'Compra não encontrada' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.compraService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove uma compra' })
  @ApiResponse({ status: 404, description: 'Compra não encontrada' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.compraService.remove(id);
  }
}
