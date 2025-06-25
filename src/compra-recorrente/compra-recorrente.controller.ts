import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { CompraRecorrenteService } from './compra-recorrente.service';
import { CreateCompraRecorrenteDto, UpdateCompraRecorrenteDto } from './compra-recorrente.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('compra-recorrente')
@Controller('compra-recorrente')
export class CompraRecorrenteController {
  constructor(private readonly compraRecorrenteService: CompraRecorrenteService) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma nova compra recorrente' })
  @ApiResponse({ status: 201, description: 'Compra recorrente criada com sucesso' })
  create(@Body() createDto: CreateCompraRecorrenteDto) {
    return this.compraRecorrenteService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todas as compras recorrentes' })
  findAll() {
    return this.compraRecorrenteService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtém uma compra recorrente pelo ID' })
  @ApiResponse({ status: 404, description: 'Compra recorrente não encontrada' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.compraRecorrenteService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza uma compra recorrente' })
  @ApiResponse({ status: 404, description: 'Compra recorrente não encontrada' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateCompraRecorrenteDto) {
    return this.compraRecorrenteService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove uma compra recorrente' })
  @ApiResponse({ status: 404, description: 'Compra recorrente não encontrada' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.compraRecorrenteService.remove(id);
  }
}
