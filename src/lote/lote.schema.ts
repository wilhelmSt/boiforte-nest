import { z } from 'zod';

export const CreateLoteSchema = z.object({
  quantidade: z.number().optional().default(1),
  custoUnitario: z.number(),
  custoTotal: z.number(),
  vencimento: z.string().refine(
    (val) => {
      // Verifica se a data é válida no formato yyyy-mm-dd
      return /^\d{4}-\d{2}-\d{2}$/.test(val) && !isNaN(new Date(val).getTime());
    },
    {
      message: 'Invalid datetime',
    }
  ), // aceita ISO 8601 string, depois converte no serviço
  corteId: z.number(),
  fornecedorId: z.number(),
  descricao: z.string(),
});

export const UpdateLoteSchema = CreateLoteSchema.partial();
