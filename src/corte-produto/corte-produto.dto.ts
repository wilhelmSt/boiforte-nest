import { createZodDto } from 'nestjs-zod';
import { CreateCorteProdutoSchema, UpdateCorteProdutoSchema } from './corte-produto.schema';

export class CreateCorteProdutoDto extends createZodDto(CreateCorteProdutoSchema) {}
export class UpdateCorteProdutoDto extends createZodDto(UpdateCorteProdutoSchema) {}
