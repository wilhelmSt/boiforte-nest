import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { CompraService } from './compra.service';
import { CreateCompraDto, UpdateCompraDto } from './compra.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

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

  @Get(':id')
  @ApiOperation({ summary: 'Obtém uma compra pelo ID' })
  @ApiResponse({ status: 404, description: 'Compra não encontrada' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.compraService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza uma compra' })
  @ApiResponse({ status: 404, description: 'Compra não encontrada' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCompraDto: UpdateCompraDto) {
    return this.compraService.update(id, updateCompraDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove uma compra' })
  @ApiResponse({ status: 404, description: 'Compra não encontrada' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.compraService.remove(id);
  }
}
