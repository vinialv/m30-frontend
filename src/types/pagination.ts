export type PaginationProps = {
  links: {
    url: string | null
    label: string
    active: boolean
  }[]
  lastPage: number
}

export interface MetaData {
  lastPage: number
  links: {
    url: string | null
    label: string
    active: boolean
  }[]
}
