import { api } from '@/infra'

import { SearchParamsProps } from '@/types/search-params'
import { CreateCustomerDTO, GetAllResponse, UpdateCustomerDTO } from '@/types/customers'

type Response = {
  statusCode?: number
  type: 'Erro' | 'Sucesso'
  message: string
}

export async function getAll(searchParams: SearchParamsProps): Promise<GetAllResponse> {
  try {
    const response = await api.get<GetAllResponse>('/customer', searchParams)

    if (response.statusCode === 200 && response.body) {
      return response.body
    }
  } catch (err: any) {
    console.error('Error fetching customers:', err)
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

export async function create(formData: CreateCustomerDTO): Promise<Response> {
  console.log('formData create', formData)
  const response = await api.post<Response, CreateCustomerDTO>('/customer', formData)

  console.log('response', response)

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
    message: response.body?.message ?? 'Não foi possível cadastrar o cadastro do cliente.',
  }
}

export async function update(formData: UpdateCustomerDTO): Promise<Response> {
  console.log('formData update', formData)
  const response = await api.put<Response, UpdateCustomerDTO>(`/customer/${formData.id}`, formData)

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
    message: response.body?.message ?? 'Não foi possível atualizar cadastro do cliente.',
  }
}

export async function remove(id: number): Promise<Response> {
  const response = await api.delete<Response>(`/customer/${id}`)
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
    message: response.body?.message ?? 'Não foi possível deletar o cadastro do cliente.',
  }
}
