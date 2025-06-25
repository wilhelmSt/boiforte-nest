import { createZodDto } from 'nestjs-zod';
import { CreateConfiguracaoSchema, UpdateConfiguracaoSchema } from './configuracao.schema';

export class CreateConfiguracaoDto extends createZodDto(CreateConfiguracaoSchema) {}
export class UpdateConfiguracaoDto extends createZodDto(UpdateConfiguracaoSchema) {}
