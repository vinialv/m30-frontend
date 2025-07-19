'use client'

import { ReactElement, cloneElement, isValidElement, useState } from 'react'

import { CirclePlus } from 'lucide-react'

import { useMediaQuery } from '@/hooks/useMediaQuery'

import { DropdownOption } from '@/types/dropdown-options'

import { Button } from '@/components/ui/button'
import { CardTitle } from '@/components/ui/card'

import { SearchInput } from '@/components/core/SearchInput'
import { StatusFilter } from '@/components/core/StatusFilter'
import { ResponsiveDialog } from '@/components/core/ResponsiveDialog'
import { toast } from 'react-toastify'

interface GenericCardHeaderProps {
  title: string
  descriptionButtonCreation: string
  children: ReactElement<{ closeModal?: () => void }>
  showSearch?: boolean
  showStatusFilter?: boolean
  searchPlaceholder?: string
  statusFilterTitle?: string
  statusDropdownOptions?: DropdownOption[]
}

export function GenericCardHeader({
  title,
  descriptionButtonCreation,
  children,
  showSearch = true,
  showStatusFilter = true,
  searchPlaceholder = 'Pesquisar',
  statusFilterTitle = 'Situação',
  statusDropdownOptions,
}: GenericCardHeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  function closeModal() {
    setIsOpen(false)
  }

  const childrenWithProps = isValidElement(children)
    ? cloneElement(children, { closeModal })
    : children

  return (
    <>
      <CardTitle>{title}</CardTitle>

      <div className='flex justify-between pt-3 gap-2 flex-col md:flex-row'>
        <div className='flex w-full gap-2'>
          {showSearch && <SearchInput placeholder={searchPlaceholder} />}
          {showStatusFilter && (
            <StatusFilter
              title={statusFilterTitle}
              dropdownOptions={statusDropdownOptions}
            />
          )}

          <div className='flex'>
            <Button
              variant='outline'
              aria-label={`Cadastrar ${descriptionButtonCreation}`}
              className='flex gap-2 bg-card text-foreground font-light'
              onClick={() => setIsOpen(true)}
            >
              <CirclePlus />
              {isDesktop && descriptionButtonCreation}
            </Button>

            <ResponsiveDialog
              title={`Cadastrar ${descriptionButtonCreation}`}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            >
              {childrenWithProps}
            </ResponsiveDialog>
          </div>
        </div>
      </div>
    </>
  )
}
