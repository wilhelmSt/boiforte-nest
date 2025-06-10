import { createZodDto } from 'nestjs-zod';
import { CreateLogsSchema, UpdateLogsSchema } from './logs.schema';

export class CreateLogsDto extends createZodDto(CreateLogsSchema) {}
export class UpdateLogsDto extends createZodDto(UpdateLogsSchema) {}
