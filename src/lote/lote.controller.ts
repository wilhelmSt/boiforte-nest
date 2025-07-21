import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { LoteService } from './lote.service';
import { CreateLoteDto, UpdateLoteDto } from './lote.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('lote')
@Controller('lote')
export class LoteController {
  constructor(private readonly loteService: LoteService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo lote' })
  @ApiResponse({ status: 201, description: 'Lote criado com sucesso' })
  create(@Body() createLoteDto: CreateLoteDto) {
    return this.loteService.create(createLoteDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os lotes' })
  findAll() {
    return this.loteService.findAll();
  }

  @Get('top-vencidos')
  @ApiOperation({ summary: 'Lista o top 3 vencidos' })
  findTopVencidos() {
    return this.loteService.getTopVencidosLotes();
  }

  @Get('top-almost-vencidos')
  @ApiOperation({ summary: 'Lista o top 3 mais perto de vencer' })
  findTopClosestToExpire() {
    return this.loteService.getTopClosestToExpiringLotes();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtém um lote pelo ID' })
  @ApiResponse({ status: 404, description: 'Lote não encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.loteService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um lote' })
  @ApiResponse({ status: 404, description: 'Lote não encontrado' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateLoteDto: UpdateLoteDto) {
    return this.loteService.update(id, updateLoteDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um lote' })
  @ApiResponse({ status: 404, description: 'Lote não encontrado' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.loteService.remove(id);
  }
}
