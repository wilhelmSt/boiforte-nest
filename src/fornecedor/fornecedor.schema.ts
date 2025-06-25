import { z } from 'zod';

export const CreateFornecedorSchema = z.object({
  nome: z.string(),
  cnpj: z.string().optional(),
  telefone: z
    .string()
    .regex(/^\d{1,3}\d{8,14}$/, 'Telefone inválido')
    .optional(),
  email: z.string().email().optional(),
  endereco: z.string().optional(),
  observacao: z.string().optional(),
});

export const UpdateFornecedorSchema = CreateFornecedorSchema.partial();
