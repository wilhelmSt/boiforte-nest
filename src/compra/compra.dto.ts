import { createZodDto } from 'nestjs-zod';
import { CreateCompraSchema, UpdateCompraSchema } from './compra.schema';

export class CreateCompraDto extends createZodDto(CreateCompraSchema) {}
export class UpdateCompraDto extends createZodDto(UpdateCompraSchema) {}
