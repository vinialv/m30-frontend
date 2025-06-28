'use client'

import { useEffect, useState } from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'

import { Filter } from 'lucide-react'

import { useMediaQuery } from '@/hooks/useMediaQuery'

import { DropdownOption } from '@/types/dropdown-options'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

type StatusFilterProps = {
  title: string | 'Situação'
  dropdownOptions?: readonly DropdownOption[]
}

export function StatusFilter({ title, dropdownOptions }: StatusFilterProps) {
  if (!dropdownOptions) {
    dropdownOptions = [
      { value: '', label: 'Todos' },
      { value: 'only-active', label: 'Ativos' },
      { value: 'only-inactive', label: 'Inativos' },
    ] as const
  }
  const [filterStatus, setFilterStatus] = useState('')

  const pathname = usePathname()
  const { replace } = useRouter()
  const searchParams = useSearchParams()
  const isDesktop = useMediaQuery('(min-width: 768px)')

  useEffect(() => {
    setFilterStatus(searchParams.get('status') || '')
  }, [searchParams])

  function handleChangeFilter(value: string) {
    const params = new URLSearchParams(searchParams)
    if (params.has('page')) {
      params.delete('page')
    }
    if (value) {
      params.set('status', value)
    } else {
      params.delete('status')
    }
    replace(`${pathname}?${params.toString()}`)
    setFilterStatus(value)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          size={'default'}
          className='flex gap-2 bg-card text-foreground font-light'
        >
          <Filter className='h-4 w-4' />
          {isDesktop && title}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-16'>
        <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={filterStatus}
          onValueChange={handleChangeFilter}
        >
          {dropdownOptions.map((item) => (
            <DropdownMenuRadioItem
              key={item.value}
              value={item.value}
            >
              {item.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
