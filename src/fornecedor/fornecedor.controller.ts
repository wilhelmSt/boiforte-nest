import { Controller, Get, Post, Body, Param, Put, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { FornecedorService } from './fornecedor.service';
import { CreateFornecedorDto, UpdateFornecedorDto } from './fornecedor.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

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
  @ApiOperation({ summary: 'Busca fornecedores por termo' })
  search(@Query('q') query: string) {
    return this.fornecedoresService.search(query);
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
