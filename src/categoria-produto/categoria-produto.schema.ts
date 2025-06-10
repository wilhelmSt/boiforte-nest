import { z } from 'zod';

export const CreateCategoriaProdutoSchema = z.object({
  nome: z.string().min(1),
  descricao: z.string().optional(),
  tipoProdutoId: z.number().int().min(1),
});

export const UpdateCategoriaProdutoSchema = CreateCategoriaProdutoSchema.partial();
