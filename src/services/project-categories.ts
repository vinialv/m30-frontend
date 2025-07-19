import { api } from '@/infra'

import { SearchParamsProps } from '@/types/search-params'
import {
  CreateProjectCategoryDTO,
  GetAllResponse,
  ProjectCategoryProps,
} from '@/types/project-categories'

type Response = {
  statusCode?: number
  type: 'Erro' | 'Sucesso'
  message: string
}

export async function getAll(searchParams: SearchParamsProps): Promise<GetAllResponse> {
  try {
    const response = await api.get<GetAllResponse>('/project-category', searchParams)

    if (response.statusCode === 200 && response.body) {
      return response.body
    }
  } catch (err: any) {
    console.error('Error fetching project categories:', err)
  }

  return {
    data: [],
    links: {
      first: null,
      last: null,
      prev: null,
      next: null,
    },
    meta: {
      currentPage: 1,
      from: 0,
      lastPage: 1,
      links: [],
    },
  }
}

export async function create(formData: CreateProjectCategoryDTO): Promise<Response> {
  const response = await api.post<Response, CreateProjectCategoryDTO>('/project-category', formData)

  if (response.statusCode === 200) {
    return {
      statusCode: response.statusCode,
      type: 'Sucesso',
      message: 'Cadastro realizado com sucesso',
    }
  }

  return {
    statusCode: response.statusCode,
    type: 'Erro',
    message: response.body?.message ?? 'Não foi possível cadastrar a categoria do projeto.',
  }
}

export async function update(formData: ProjectCategoryProps): Promise<Response> {
  console.log(formData)

  const response = await api.put<Response, ProjectCategoryProps>(
    `/project-category/${formData.id}`,
    formData
  )

  console.log(response)

  if (response.statusCode === 200) {
    return {
      statusCode: response.statusCode,
      type: 'Sucesso',
      message: 'Cadastro atualizado com sucesso',
    }
  }

  return {
    statusCode: response.statusCode,
    type: 'Erro',
    message: response.body?.message ?? 'Não foi possível atualizar a categoria do projeto.',
  }
}

export async function remove(id: number): Promise<Response> {
  const response = await api.delete<Response>(`/project-category/${id}`)
  if (response.statusCode === 200) {
    return {
      statusCode: response.statusCode,
      type: 'Sucesso',
      message: 'Registro excluído com sucesso.',
    }
  }

  return {
    statusCode: response.statusCode,
    type: 'Erro',
    message: response.body?.message ?? 'Não foi possível deletar a categoria do projeto.',
  }
}
