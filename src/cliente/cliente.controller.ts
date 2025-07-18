import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto, UpdateClienteDto } from './cliente.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('cliente')
@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo cliente' })
  @ApiResponse({ status: 201, description: 'Cliente criado com sucesso' })
  create(@Body() createClienteDto: CreateClienteDto) {
    return this.clienteService.create(createClienteDto);
  }

  @Get('search')
  @ApiOperation({ summary: 'Listar clientes com filtro' })
  @ApiResponse({ status: 200, description: 'Lista clientes com filtro' })
  search(
    @Query('q') query: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('orderBy') orderBy = 'nome',
    @Query('orderDirection') orderDirection: 'asc' | 'desc' = 'asc'
  ) {
    return this.clienteService.search(query, +page, +limit, orderBy, orderDirection);
  }

  @Get('top-clientes')
  @ApiOperation({ summary: 'Obtém os top 3 clientes com mais compras' })
  @ApiResponse({ status: 200, description: 'Os top 3 clientes com mais compras' })
  getTopClientes() {
    return this.clienteService.getTopClientes();
  }

  @Get('clientes-ativos')
  @ApiOperation({ summary: 'Obtém a quantidade de clientes ativos' })
  @ApiResponse({ status: 200, description: 'Clientes ativos' })
  async getFornecedoresAtivos() {
    return this.clienteService.getClientesAtivos();
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os clientes' })
  findAll() {
    return this.clienteService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtém um cliente pelo ID' })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.clienteService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um cliente' })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateClienteDto: UpdateClienteDto) {
    return this.clienteService.update(id, updateClienteDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um cliente' })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.clienteService.remove(id);
  }
}
