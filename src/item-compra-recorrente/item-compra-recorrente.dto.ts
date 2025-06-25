import { createZodDto } from 'nestjs-zod';
import { CreateItemCompraRecorrenteSchema, UpdateItemCompraRecorrenteSchema } from './item-compra-recorrente.schema';

export class CreateItemCompraRecorrenteDto extends createZodDto(CreateItemCompraRecorrenteSchema) {}
export class UpdateItemCompraRecorrenteDto extends createZodDto(UpdateItemCompraRecorrenteSchema) {}
