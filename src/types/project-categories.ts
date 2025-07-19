import { MetaData, LinksProps } from './pagination'

export type ProjectCategoryProps = {
  id: number
  description: string
  status?: string
}

export type CreateProjectCategoryDTO = Omit<ProjectCategoryProps, 'id'>

export type GetAllResponse = {
  data: ProjectCategoryProps[]
  links: LinksProps
  meta: MetaData
}

export type FormActionResponse = {
  success?: boolean
  statusCode?: number
  message?: string
  data?: CreateProjectCategoryDTO | FormData
  errors?: {
    description?: string[]
    status?: string[]
  }
}
