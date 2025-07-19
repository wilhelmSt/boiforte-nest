import { createZodDto } from 'nestjs-zod';
import { CreateEspecieProdutoSchema, UpdateEspecieProdutoSchema } from './especie-produto.schema';

export class CreateEspecieProdutoDto extends createZodDto(CreateEspecieProdutoSchema) {}
export class UpdateEspecieProdutoDto extends createZodDto(UpdateEspecieProdutoSchema) {}
