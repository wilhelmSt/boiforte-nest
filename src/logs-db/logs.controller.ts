import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { LogsService } from './logs.service';
import { CreateLogsDto, UpdateLogsDto } from './logs.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('logs')
@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo log' })
  create(@Body() createDto: CreateLogsDto) {
    return this.logsService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os logs' })
  findAll() {
    return this.logsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtém um log pelo ID' })
  @ApiResponse({ status: 404, description: 'Log não encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.logsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um log' })
  @ApiResponse({ status: 404, description: 'Log não encontrado' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateLogsDto) {
    return this.logsService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um log' })
  @ApiResponse({ status: 404, description: 'Log não encontrado' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.logsService.remove(id);
  }
}
