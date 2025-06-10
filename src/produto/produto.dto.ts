import { createZodDto } from 'nestjs-zod';
import { CreateProdutoSchema, UpdateProdutoSchema } from './produto.schema';

export class CreateProdutoDto extends createZodDto(CreateProdutoSchema) {}
export class UpdateProdutoDto extends createZodDto(UpdateProdutoSchema) {}
