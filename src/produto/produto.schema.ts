import { z } from 'zod';

export const CreateProdutoSchema = z.object({
  codigo: z.string().optional(),
  descricao: z.string().optional(),
  precoPadrao: z.number(),
  estoqueMinimo: z.number().default(0),
  promocao: z.boolean().default(false),
  precoPromocional: z.number().optional(),
  descontoAtacado: z.boolean().default(false),
  precoAtacado: z.number().optional(),
  quantidadeAtacado: z.number().optional(),
  imagem: z.string().optional(),
  corteId: z.number(),
});

export const UpdateProdutoSchema = CreateProdutoSchema.partial();
