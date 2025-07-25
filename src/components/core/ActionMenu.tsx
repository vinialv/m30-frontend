'use client'

import { ReactNode } from 'react'
import { MoreHorizontal } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

type ActionItem<T> = {
  label: string
  icon?: ReactNode
  onClick?: (item: T) => void
  variant?: 'default' | 'danger'
  disabled?: boolean
}

type Props<T> = {
  item: T
  actions: ActionItem<T>[]
}

export function ActionMenu<T>({ item, actions }: Props<T>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='h-8 w-8 p-0'
        >
          <span className='sr-only'>Abrir menu</span>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        className='w-[160px] z-50'
      >
        {actions.map((action, index) => (
          <DropdownMenuItem
            key={`${action.label}-${index}`}
            onClick={() => !action.disabled && action.onClick?.(item)}
            disabled={action.disabled}
            className={`group text-sm p-2 flex items-center gap-2 rounded
              ${
                action.variant === 'danger'
                  ? 'text-red-500 hover:text-red-600'
                  : 'text-neutral-600 hover:text-neutral-900'
              }
            `}
          >
            {action.icon}
            {action.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
