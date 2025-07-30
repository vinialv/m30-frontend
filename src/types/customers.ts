import { MetaData, LinksProps } from './pagination'

export type CustomerProps = {
  id: number
  name: string
  email: string
  phone: string
  city: {
    id: number
    name: string
    state: {
      id: number
      name: string
      uf: string
    }
  }
  status?: string
}

export type CreateCustomerDTO = Omit<CustomerProps, 'id' | 'city'> & {
  city: {
    id: number
  }
}

export type UpdateCustomerDTO = Omit<CustomerProps, 'city' | 'status'> & {
  city: {
    id: number
  }
  status: string
}

export type GetAllResponse = {
  data: CustomerProps[]
  links: LinksProps
  meta: MetaData
}

export type FormActionResponse = {
  success?: boolean
  statusCode?: number
  message?: string
  data?: CreateCustomerDTO | FormData
  errors?: {
    name?: string[]
    email?: string[]
    phone?: string[]
    city?: string[]
    state?: string[]
    status?: string[]
  }
}
