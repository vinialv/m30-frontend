'use server'

import { z } from 'zod'
import { create } from '@/services/project-categories'
import { revalidatePath } from 'next/cache'

const schema = z.object({
  description: z.string().min(1, 'Campo obrigatório'),
})

export async function createCategoryAction(_: unknown, formData: FormData) {
  const parsed = schema.safeParse({
    description: formData.get('description'),
  })

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
      message: 'Existem erros no formulário',
    }
  }

  const response = await create({
    description: parsed.data.description,
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
    revalidatePath('/project-categories')
  }

  return {
    success: true,
    statusCode: response.statusCode,
    message: response.message,
    data: parsed.data,
  }
}
