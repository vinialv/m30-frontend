'use client'

import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useTransition } from 'react'

type PaginationProps = {
  links: {
    url: string | null
    label: string
    active: boolean
  }[]
  lastPage: number
}

export function Pagination({ links, lastPage }: PaginationProps) {
  const [isPending, startTransition] = useTransition()
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  function handlePagination(pageNumber: number) {
    const params = new URLSearchParams(searchParams)

    if (pageNumber > 1) {
      if (pageNumber > lastPage) {
        params.set('page', lastPage.toString())
      } else {
        params.set('page', pageNumber.toString())
      }
    } else {
      params.delete('page')
    }
    startTransition(() => {
      replace(`${pathname}?${params.toString()}`, { scroll: false })
    })
  }
  return (
    <PaginationComponent>
      <PaginationContent>
        <PaginationItem
          className={`${(!links[0].url || isPending) && 'pointer-events-none text-slate-300'}`}
          onClick={() => handlePagination(Number(searchParams.get('page') || 1) - 1)}
        >
          <PaginationPrevious />
        </PaginationItem>

        {isDesktop && (
          <>
            {links.map((link, index) => {
              if (link.label.includes('Previous') || link.label.includes('Next')) {
                return null
              }

              if (link.label === '...') {
                return (
                  <PaginationItem
                    key={index}
                    className='hidden md:inline-flex'
                  >
                    <PaginationEllipsis />
                  </PaginationItem>
                )
              }

              return (
                <PaginationItem
                  key={index}
                  className='flex cursor-pointer'
                >
                  <PaginationLink
                    onClick={() => {
                      if (!isPending) handlePagination(Number(link.label))
                    }}
                    className={`${
                      isPending ? 'pointer-events-none text-slate-300' : 'cursor-pointer'
                    }`}
                    isActive={link.active}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                  ></PaginationLink>
                </PaginationItem>
              )
            })}
          </>
        )}

        <PaginationItem
          className={`${
            (!links[links.length - 1].url || isPending) && 'pointer-events-none text-slate-300'
          }`}
          onClick={() => handlePagination(Number(searchParams.get('page') || 1) + 1)}
        >
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </PaginationComponent>
  )
}
