'use server'

import { z } from 'zod'
import { login } from '@/services/auth/login'

const schema = z.object({
  email: z.string().min(1, 'Campo obrigatório'),
  password: z.string().min(1, 'Campo obrigatório'),
})

export async function loginAction(_: unknown, formData: FormData) {
  const parsed = schema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
      message: 'Existem erros no formulário',
    }
  }

  const response = await login({
    email: parsed.data.email,
    password: parsed.data.password,
  })

  if (response?.response.statusCode !== 200) {
    return {
      success: false,
      statusCode: response?.response.statusCode || 400,
      message: 'E-mail ou senha inválido',
    }
  }

  if (response?.response.statusCode === 200) {
    return {
      success: true,
      statusCode: response.response.statusCode,
      redirectTo: response.redirectTo || '/',
    }
  }

  return {
    success: true,
    statusCode: response.response.statusCode,
    data: parsed.data,
    redirectTo: response.redirectTo || '/',
  }
}
