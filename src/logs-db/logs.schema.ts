import { z } from 'zod';

export const CreateLogsSchema = z.object({
  categoria: z.string().optional(),
  tipo: z.string().optional(),
  descricao: z.string().optional(),
  request: z.string().optional(),
  response: z.string().optional(),
});

export const UpdateLogsSchema = CreateLogsSchema.partial();
