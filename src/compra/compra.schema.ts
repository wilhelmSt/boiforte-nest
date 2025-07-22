import { ItemCompraSchema } from 'src/item-compra/item-compra.schema';
import { z } from 'zod';

export const CreateCompraSchema = z.object({
  tipoPagamento: z.enum(['DINHEIRO', 'CARTAO', 'PIX', 'BOLETO']).default('DINHEIRO'),
  condicaoPagamento: z.enum(['A_VISTA', 'PARCELADO']).default('A_VISTA'),
  status: z.enum(['PAGO', 'ENTREGUE', 'CANCELADO']).default('PAGO'),
  valorTotal: z.number().positive(),
  valorTotalFinal: z.number().positive(),
  desconto: z.number().min(0).default(0),
  descontoFinal: z.number().min(0).default(0),
  observacao: z.string().max(500).optional(),
  nfeNumero: z.string().max(50).optional(),
  nfeChave: z.string().max(44).optional(),
  clienteId: z.number().int().positive(),
  itens: z.array(ItemCompraSchema).min(1, 'A compra deve ter pelo menos um item'),
});

export const UpdateCompraSchema = CreateCompraSchema.partial();

export type CreateCompraSchemaType = z.infer<typeof CreateCompraSchema>;
export type UpdateCompraSchemaType = z.infer<typeof UpdateCompraSchema>;
