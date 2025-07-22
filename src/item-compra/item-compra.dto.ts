import { createZodDto } from 'nestjs-zod';
import { ItemCompraSchema } from 'src/item-compra/item-compra.schema';

export class CreateItemCompraDto extends createZodDto(ItemCompraSchema) {}
export class UpdateItemCompraDto extends createZodDto(ItemCompraSchema.partial()) {}
