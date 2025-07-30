'use server'

import { z } from 'zod'
import { create } from '@/services/customers'
import { revalidatePath } from 'next/cache'

const schema = z.object({
  name: z.string().min(1, 'Informe o nome'),
  email: z
    .string()
    .min(1, { message: 'Informe o e-mail' })
    .email({ message: 'Por favor, informe um e-mail válido' }),
  phone: z.string().min(1, { message: 'Informe o telefone' }),
  city: z.coerce
    .number({ invalid_type_error: 'Informe a cidade' })
    .min(1, { message: 'Informe a cidade' }),
})

export async function createCustomerAction(_: unknown, formData: FormData) {
  const parsed = schema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    city: formData.get('city'),
    state: formData.get('state'),
  })

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
      message: 'Existem erros no formulário',
    }
  }

  const response = await create({
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    city: { id: parsed.data.city },
    status: 'A',
  })

  if (response.statusCode !== 200) {
    return {
      success: false,
      statusCode: response.statusCode,
      message: response.message,
    }
  }

  if (response.statusCode === 200) {
    revalidatePath('/customers')
  }

  return {
    success: true,
    statusCode: response.statusCode,
    message: response.message,
    data: {
      ...parsed.data,
      city: { id: parsed.data.city },
    },
  }
}
