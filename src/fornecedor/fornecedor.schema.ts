import { z } from 'zod';

export const CreateFornecedorSchema = z.object({
  nome: z
    .string({
      required_error: 'O nome é obrigatório',
      invalid_type_error: 'O nome deve ser um string',
    })
    .min(3, {
      message: 'O nome deve ter pelo menos 3 caracteres',
    }),

  cnpj: z
    .string({
      invalid_type_error: 'CNPJ/CPF deve ser um string',
    })
    .refine((val) => !val || /^\d{11,14}$/.test(val.replace(/\D/g, '')), {
      message: 'CNPJ/CPF inválido (deve conter 11 ou 14 dígitos)',
    }),

  telefone: z
    .string({
      invalid_type_error: 'Telefone deve ser um string',
    })
    .regex(/^[\d()\s-]{10,15}$/, {
      message: 'Telefone inválido (formato esperado: (00) 0000-0000 ou (00) 00000-0000)',
    }),

  email: z
    .union([
      z.string().email({
        message: 'E-mail inválido (exemplo: nome@dominio.com)',
      }),
      z.literal(''),
      z.null(),
    ])
    .optional()
    .transform((val) => (val === '' || val === null ? undefined : val)),

  endereco: z
    .union([
      z.string({
        invalid_type_error: 'Endereço deve ser um string',
      }),
      z.null(),
    ])
    .optional()
    .transform((val) => (val === null ? undefined : val)),

  observacao: z
    .union([
      z.string({
        invalid_type_error: 'Observação deve ser um string',
      }),
      z.null(),
    ])
    .optional()
    .transform((val) => (val === null ? undefined : val)),
});

export const UpdateFornecedorSchema = CreateFornecedorSchema.partial();
