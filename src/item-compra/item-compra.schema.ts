import { z } from 'zod';

export const CreateItemCompraSchema = z.object({
  quantidade: z.number(),
  preco: z.number(),
  desconto: z.number().optional().default(0),
  total: z.number(),
  compraId: z.number(),
  produtoId: z.number(),
});

export const UpdateItemCompraSchema = CreateItemCompraSchema.partial();
