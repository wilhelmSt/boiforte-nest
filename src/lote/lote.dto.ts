import { createZodDto } from 'nestjs-zod';
import { CreateLoteSchema, UpdateLoteSchema } from './lote.schema';

export class CreateLoteDto extends createZodDto(CreateLoteSchema) {}
export class UpdateLoteDto extends createZodDto(UpdateLoteSchema) {}
