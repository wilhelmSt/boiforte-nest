import { createZodDto } from 'nestjs-zod';
import { CreateClienteSchema, UpdateClienteSchema } from './cliente.schema';

export class CreateClienteDto extends createZodDto(CreateClienteSchema) {}
export class UpdateClienteDto extends createZodDto(UpdateClienteSchema) {}
