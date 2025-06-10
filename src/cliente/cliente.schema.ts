import { z } from 'zod';

export const CreateClienteSchema = z.object({
  nome: z.string(),
  cpfCnpj: z.string().optional(),
  telefone: z.string().optional(),
  email: z.string().email().optional(),
  endereco: z.string().optional(),
  observacao: z.string().optional(),
});

export const UpdateClienteSchema = CreateClienteSchema.partial();
