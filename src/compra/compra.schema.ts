import { z } from 'zod';

export const CreateCompraSchema = z.object({
  tipoPagamento: z.enum(['DINHEIRO', 'CARTAO', 'PIX', 'BOLETO']).default('DINHEIRO'),
  condicaoPagamento: z.enum(['A_VISTA', 'PARCELADO']).default('A_VISTA'),
  status: z.enum(['PAGO', 'ENTREGUE', 'CANCELADO']),
  valorTotal: z.number(),
  valorTotalFinal: z.number(),
  desconto: z.number().default(0),
  descontoFinal: z.number().default(0),
  observacao: z.string().optional(),
  nfeNumero: z.string().optional(),
  nfeChave: z.string().optional(),
  clienteId: z.number(),
});

export const UpdateCompraSchema = CreateCompraSchema.partial();
