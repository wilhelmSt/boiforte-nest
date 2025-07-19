import { z } from 'zod';

export const CreateEspecieProdutoSchema = z.object({
  nome: z.string().min(1),
  descricao: z.string().optional(),
});

export const UpdateEspecieProdutoSchema = CreateEspecieProdutoSchema.partial();
