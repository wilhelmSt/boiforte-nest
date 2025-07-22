import { z } from 'zod';

export const ItemCompraSchema = z.object({
  produtoId: z.number().int().positive(),
  quantidade: z.number().positive(),
  preco: z.number().positive(),
  desconto: z.number().min(0).default(0),
  total: z.number().positive(),
});

export type ItemCompraSchemaType = z.infer<typeof ItemCompraSchema>;
