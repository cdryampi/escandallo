import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Introduce un email valido.'),
  password: z.string().min(1, 'La contrasena es obligatoria.'),
})

export const forgotPasswordSchema = z.object({
  email: z.string().email('Introduce un email valido.'),
})

export const resetPasswordSchema = z
  .object({
    email: z.string().email('Introduce un email valido.'),
    password: z.string().min(8, 'La contrasena debe tener al menos 8 caracteres.'),
    password_confirmation: z.string().min(8, 'Confirma la contrasena.'),
    token: z.string().min(1, 'Token requerido.'),
  })
  .refine((value) => value.password === value.password_confirmation, {
    path: ['password_confirmation'],
    message: 'Las contrasenas no coinciden.',
  })

export type LoginFormValues = z.infer<typeof loginSchema>
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>
