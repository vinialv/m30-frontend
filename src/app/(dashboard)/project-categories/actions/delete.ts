'use server'

import { remove } from '@/services/project-categories'
import { revalidatePath } from 'next/cache'

export async function deleteCategoryAction(formData: FormData) {
  const idRaw = formData.get('id')
  const id = Number(idRaw)

  if (isNaN(id) || id <= 0) {
    return {
      success: false,
      statusCode: 400,
      message: 'ID inválido para exclusão.',
    }
  }

  try {
    const response = await remove(id)

    if (response.statusCode === 200) {
      revalidatePath('/project-categories')

      return {
        success: true,
        statusCode: response.statusCode,
        message: response.message || 'Registro excluído com sucesso.',
      }
    } else {
      return {
        success: false,
        statusCode: response.statusCode,
        message: response.message || 'Falha ao excluir o registro.',
      }
    }
  } catch (error) {
    console.error('Erro ao excluir categoria:', error)

    return {
      success: false,
      statusCode: 500,
      message: 'Erro interno ao processar a exclusão.',
    }
  }
}
