'use server'

import { z } from 'zod'
import { update } from '@/services/project-categories'
import { revalidatePath } from 'next/cache'
import { ProjectCategoryProps } from '@/types/project-categories'

const schema = z.object({
  description: z.string().min(1, 'Descrição é obrigatória'),
  status: z.enum(['A', 'I'], { message: 'Status é obrigatório' }),
})

export async function updateCategoryAction(_: unknown, data: FormData) {
  const parsed = schema.safeParse({
    description: data.get('description'),
    status: data.get('status'),
  })

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
      message: 'Existem erros no formulário',
    }
  }

  const projectCategorySelected: ProjectCategoryProps = {
    id: Number(data.get('id')),
    description: data.get('description') as string,
    status: data.get('status') as 'A' | 'I',
  }

  const response = await update(projectCategorySelected)

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
