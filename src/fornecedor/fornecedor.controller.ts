import { Controller, Get, Post, Body, Param, Put, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { FornecedorService } from './fornecedor.service';
import { CreateFornecedorDto, UpdateFornecedorDto } from './fornecedor.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

@ApiTags('fornecedor')
@Controller('fornecedor')
export class FornecedorController {
  constructor(private readonly fornecedoresService: FornecedorService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo fornecedor' })
  @ApiResponse({
    status: 201,
    description: 'Fornecedor criado com sucesso',
  })
  create(@Body() createFornecedorDto: CreateFornecedorDto) {
    return this.fornecedoresService.create(createFornecedorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os fornecedores' })
  findAll() {
    return this.fornecedoresService.findAll();
  }

  @Get('search')
  @ApiOperation({ summary: 'Busca paginada de fornecedores por termo' })
  @ApiQuery({ name: 'q', required: false, description: 'Termo de busca' })
  @ApiQuery({ name: 'page', required: false, description: 'Página atual', example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: 'Itens por página', example: 10 })
  @ApiQuery({
    name: 'orderBy',
    required: false,
    description: 'Campo para ordenação (nome, endereco, telefone, ultima_entrada, quantidade_lotes)',
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
    return this.fornecedoresService.search(query, +page, +limit, orderBy, orderDirection);
  }

  @Get('top-fornecedores')
  @ApiOperation({ summary: 'Obtém os top 3 fornecedores com mais compras' })
  @ApiResponse({ status: 200, description: 'Os top 3 fornecedores com mais compras' })
  async getTopFornecedores() {
    return this.fornecedoresService.getTopFornecedores();
  }

  @Get('fornecedores-ativos')
  @ApiOperation({ summary: 'Obtém a quantidade de fornecedores ativos' })
  @ApiResponse({ status: 200, description: 'Fornecedores ativos' })
  async getFornecedoresAtivos() {
    return this.fornecedoresService.getFornecedoresAtivos();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtém um fornecedor pelo ID' })
  @ApiResponse({ status: 404, description: 'Fornecedor não encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.fornecedoresService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um fornecedor' })
  @ApiResponse({ status: 404, description: 'Fornecedor não encontrado' })
  @ApiResponse({
    status: 201,
    description: 'Fornecedor criado com sucesso',
  })
  updateOne(@Param('id', ParseIntPipe) id: number, @Body() updateFornecedorDto: UpdateFornecedorDto) {
    return this.fornecedoresService.update(id, updateFornecedorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um fornecedor' })
  @ApiResponse({ status: 404, description: 'Fornecedor não encontrado' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.fornecedoresService.remove(id);
  }
}
