import { createZodDto } from 'nestjs-zod';
import { CreateTipoProdutoSchema, UpdateTipoProdutoSchema } from './tipo-produto.schema';

export class CreateTipoProdutoDto extends createZodDto(CreateTipoProdutoSchema) {}
export class UpdateTipoProdutoDto extends createZodDto(UpdateTipoProdutoSchema) {}
