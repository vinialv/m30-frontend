'use server'

import { remove } from '@/services/project-categories'
import { FormActionResponse } from '@/types/project-categories'

export async function deleteCategoryAction(_: FormActionResponse, data: FormData) {
  try {
    const idRaw = data.get('id')
    const id = Number(idRaw)

    if (isNaN(id) || id <= 0) {
      return {
        success: false,
        statusCode: 400,
        message: 'ID inválido para exclusão.',
      }
    }

    const response = await remove(id)

    const result = {
      success: response.statusCode === 200,
      statusCode: response.statusCode,
      message:
        response.statusCode === 200
          ? response.message || 'Registro excluído com sucesso.'
          : response.message || 'Falha ao excluir o registro.',
    }
    return result
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message: 'Erro interno ao processar a exclusão.',
    }
  }
}
