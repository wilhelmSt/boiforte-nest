import { createZodDto } from 'nestjs-zod';
import { CreateItemCompraSchema, UpdateItemCompraSchema } from './item-compra.schema';

export class CreateItemCompraDto extends createZodDto(CreateItemCompraSchema) {}
export class UpdateItemCompraDto extends createZodDto(UpdateItemCompraSchema) {}
