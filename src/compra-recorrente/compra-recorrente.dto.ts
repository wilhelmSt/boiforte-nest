import { createZodDto } from 'nestjs-zod';
import { CreateCompraRecorrenteSchema, UpdateCompraRecorrenteSchema } from './compra-recorrente.schema';

export class CreateCompraRecorrenteDto extends createZodDto(CreateCompraRecorrenteSchema) {}
export class UpdateCompraRecorrenteDto extends createZodDto(UpdateCompraRecorrenteSchema) {}
