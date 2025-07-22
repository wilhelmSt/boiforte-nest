import { Controller, Get, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ItemCompraService } from './item-compra.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('item-compra')
@Controller('item-compra')
export class ItemCompraController {
  constructor(private readonly itemCompraService: ItemCompraService) {}

  @Get()
  @ApiOperation({ summary: 'Lista todos os itens de compra' })
  findAll() {
    return this.itemCompraService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtém um item de compra pelo ID' })
  @ApiResponse({ status: 404, description: 'ItemCompra não encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.itemCompraService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um item de compra' })
  @ApiResponse({ status: 404, description: 'ItemCompra não encontrado' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.itemCompraService.remove(id);
  }
}
