import { createZodDto } from 'nestjs-zod';
import { CreateFornecedorSchema, UpdateFornecedorSchema } from './fornecedor.schema';

export class CreateFornecedorDto extends createZodDto(CreateFornecedorSchema) {}
export class UpdateFornecedorDto extends createZodDto(UpdateFornecedorSchema) {}
