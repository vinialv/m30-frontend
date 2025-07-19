export type LinksProps = {
  first: string | null
  last: string | null
  prev: string | null
  next: string | null
}

export interface MetaData {
  currentPage: number
  from: number
  lastPage: number
  links: {
    url: string | null
    label: string
    active: boolean
  }[]
}

export type PaginationProps = {
  links: {
    url: string | null
    label: string
    active: boolean
  }[]
  lastPage: number
}
