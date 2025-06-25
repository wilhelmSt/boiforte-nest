import { z } from 'zod';

export const CreateConfiguracaoSchema = z.object({
  chave: z.string(),
  valor: z.string(),
  descricao: z.string().optional(),
});

export const UpdateConfiguracaoSchema = CreateConfiguracaoSchema.partial();
