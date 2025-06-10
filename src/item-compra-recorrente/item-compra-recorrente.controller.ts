import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { ItemCompraRecorrenteService } from './item-compra-recorrente.service';
import { CreateItemCompraRecorrenteDto, UpdateItemCompraRecorrenteDto } from './item-compra-recorrente.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('item-compra-recorrente')
@Controller('item-compra-recorrente')
export class ItemCompraRecorrenteController {
  constructor(private readonly itemCompraRecorrenteService: ItemCompraRecorrenteService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo item de compra recorrente' })
  create(@Body() createDto: CreateItemCompraRecorrenteDto) {
    return this.itemCompraRecorrenteService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os itens de compra recorrente' })
  findAll() {
    return this.itemCompraRecorrenteService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtém um item de compra recorrente pelo ID' })
  @ApiResponse({ status: 404, description: 'ItemCompraRecorrente não encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.itemCompraRecorrenteService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um item de compra recorrente' })
  @ApiResponse({ status: 404, description: 'ItemCompraRecorrente não encontrado' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateItemCompraRecorrenteDto) {
    return this.itemCompraRecorrenteService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um item de compra recorrente' })
  @ApiResponse({ status: 404, description: 'ItemCompraRecorrente não encontrado' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.itemCompraRecorrenteService.remove(id);
  }
}
