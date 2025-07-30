'use server'

import { z } from 'zod'
import { update } from '@/services/customers'
import { revalidatePath } from 'next/cache'
import { UpdateCustomerDTO } from '@/types/customers'

const schema = z.object({
  id: z.number().min(1, 'Informe o ID'),
  name: z.string().min(1, 'Informe o nome'),
  email: z
    .string()
    .min(1, { message: 'Informe o e-mail' })
    .email({ message: 'Por favor, informe um e-mail válido' }),
  phone: z.string().min(1, { message: 'Informe o telefone' }),
  city: z.coerce
    .number({ invalid_type_error: 'Informe a cidade' })
    .min(1, { message: 'Informe a cidade' }),
  status: z.enum(['A', 'I'], { message: 'Status é obrigatório' }),
})

export async function updateCustomerAction(_: unknown, data: FormData) {
  const parsed = schema.safeParse({
    id: Number(data.get('id')),
    name: data.get('name'),
    email: data.get('email'),
    phone: data.get('phone'),
    city: data.get('city'),
    state: data.get('state'),
    status: data.get('status'),
  })

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
      message: 'Existem erros no formulário',
    }
  }

  const dto: UpdateCustomerDTO = {
    id: parsed.data.id,
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    city: { id: parsed.data.city },
    status: parsed.data.status,
  }

  const response = await update(dto)

  if (response.statusCode === 200) {
    revalidatePath('/customers')
  }

  return {
    success: true,
    statusCode: response.statusCode,
    message: response.message,
    data: dto,
  }
}
