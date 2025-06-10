import { z } from 'zod';

export const CreateItemCompraRecorrenteSchema = z.object({
  quantidade: z.number(),
  preco: z.number(),
  desconto: z.number().optional().default(0),
  total: z.number(),
  compraRecorrenteId: z.number(),
  produtoId: z.number(),
});

export const UpdateItemCompraRecorrenteSchema = CreateItemCompraRecorrenteSchema.partial();
