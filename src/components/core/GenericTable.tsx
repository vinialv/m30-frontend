import { redirect } from 'next/navigation'

import { SearchX } from 'lucide-react'

import { MetaData } from '@/types/pagination'
import type { SearchParamsProps } from '@/types/search-params'

import { TableBody, TableCell, TableFooter, TableRow } from '@/components/ui/table'

import { Pagination } from '@/components/core/Pagination'

interface GenericTableProps<T> {
  searchParams: Promise<SearchParamsProps>
  fetcher: (params: SearchParamsProps) => Promise<{
    data: T[]
    meta: MetaData
  }>
  renderRow: (item: T) => React.ReactNode | React.ReactNode[]
  rowKey: (item: T) => string | number
  columns: number
  emptyMessage?: string
  showFooter?: boolean
}

export async function GenericTable<T>({
  searchParams,
  fetcher,
  renderRow,
  rowKey,
  columns,
  emptyMessage = 'Nenhum registro encontrado.',
  showFooter = true,
}: GenericTableProps<T>) {
  const params = await searchParams
  const { data, meta } = await fetcher(params)

  const currentPage = Number(params.page) || 1

  if (data.length === 0 && currentPage > 1) {
    const newPage = currentPage - 1
    const query = new URLSearchParams({
      ...params,
      page: newPage.toString(),
    }).toString()
    redirect(`?${query}`)
  }

  if (data.length === 0) {
    return (
      <TableBody className='h-full'>
        <TableRow>
          <TableCell colSpan={columns}>
            <div className='flex flex-col h-[500px] w-full justify-center items-center gap-4'>
              <SearchX className='text-accent-foreground/15' />
              <span
                className='text-accent-foreground/20 text-lg font-light tracking-wide'
                role='status'
                aria-live='polite'
              >
                {emptyMessage}
              </span>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    )
  }

  return (
    <>
      <TableBody>
        {data.map((item) => (
          <TableRow key={String(rowKey(item))}>{renderRow(item)}</TableRow>
        ))}
      </TableBody>

      {showFooter && (
        <TableFooter>
          <TableRow>
            <TableCell
              colSpan={columns}
              className='pt-6 px-0'
            >
              <Pagination
                links={meta.links}
                lastPage={meta.lastPage}
              />
            </TableCell>
          </TableRow>
        </TableFooter>
      )}
    </>
  )
}
