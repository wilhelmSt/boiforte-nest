import { z } from 'zod';

export const CreateCompraRecorrenteSchema = z.object({
  tipoPagamento: z.enum(['DINHEIRO', 'CARTAO', 'PIX', 'BOLETO']).default('DINHEIRO'),
  condicaoPagamento: z.enum(['A_VISTA', 'PARCELADO']).default('A_VISTA'),
  valorTotal: z.number(),
  valorTotalFinal: z.number(),
  desconto: z.number().default(0),
  descontoFinal: z.number().default(0),
  observacao: z.string().optional(),
  clienteId: z.number(),
});

export const UpdateCompraRecorrenteSchema = CreateCompraRecorrenteSchema.partial();
