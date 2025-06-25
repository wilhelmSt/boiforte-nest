import { z } from 'zod';

export const CreateLoteSchema = z.object({
  quantidade: z.number().optional().default(1),
  custoUnitario: z.number(),
  custoTotal: z.number(),
  vencimento: z.string().datetime(), // aceita ISO 8601 string, depois converte no serviço
  produtoId: z.number(),
  fornecedorId: z.number(),
});

export const UpdateLoteSchema = CreateLoteSchema.partial();
