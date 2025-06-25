import { z } from 'zod';

export const CreateProdutoSchema = z.object({
  nome: z.string(),
  codigo: z.string().optional(),
  descricao: z.string().optional(),
  precoPadrao: z.number(),
  estoqueMinimo: z.number().default(0),
  estoque: z.number().default(0),
  unidadeMedida: z.enum(['und', 'g', 'kg'], {
    errorMap: () => ({ message: 'Unidade inválida. Use "und", "g" ou "kg".' }),
  }),
  promocao: z.boolean().default(false),
  precoPromocional: z.number().optional(),
  descontoAtacado: z.boolean().default(false),
  precoAtacado: z.number().optional(),
  quantidadeAtacado: z.number().optional(),
  imagem: z.string().optional(),
  categoriaId: z.number(),
});

export const UpdateProdutoSchema = CreateProdutoSchema.partial();
