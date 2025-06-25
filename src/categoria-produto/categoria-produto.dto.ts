import { createZodDto } from 'nestjs-zod';
import { CreateCategoriaProdutoSchema, UpdateCategoriaProdutoSchema } from './categoria-produto.schema';

export class CreateCategoriaProdutoDto extends createZodDto(CreateCategoriaProdutoSchema) {}
export class UpdateCategoriaProdutoDto extends createZodDto(UpdateCategoriaProdutoSchema) {}
