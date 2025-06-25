import { z } from 'zod';

export const CreateTipoProdutoSchema = z.object({
  nome: z.string().min(1),
  descricao: z.string().optional(),
});

export const UpdateTipoProdutoSchema = CreateTipoProdutoSchema.partial();
