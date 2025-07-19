'use server'

import { z } from 'zod'
import { update } from '@/services/project-categories'
import { revalidatePath } from 'next/cache'
import { ProjectCategoryProps } from '@/types/project-categories'

const schema = z.object({
  description: z.string().min(1, 'Descrição é obrigatória'),
  status: z.enum(['A', 'I'], { message: 'Status é obrigatório' }),
})

export async function updateCategoryAction(_: unknown, formData: FormData) {
  const parsed = schema.safeParse({
    description: formData.get('description'),
    status: formData.get('status'),
  })

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
      message: 'Existem erros no formulário',
    }
  }

  const projectCategorySelected: ProjectCategoryProps = {
    id: Number(formData.get('id')),
    description: formData.get('description') as string,
    status: formData.get('status') as 'A' | 'I',
  }

  const response = await update(projectCategorySelected)

  console.log('Response from update action:', response)

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
