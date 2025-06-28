'use client'

import { useState } from 'react'
import { MoreHorizontal, SquarePen, Trash2 } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

import { ResponsiveDialog } from '@/components/core/ResponsiveDialog'

type ActionItem<T> = {
  label: string
  icon?: React.ReactNode
  onClick?: (item: T) => void
  variant?: 'default' | 'danger'
}

type TableRowActionsProps<T> = {
  item: T
  actions?: ActionItem<T>[]
  renderEditForm?: (props: { item: T; close: () => void }) => React.ReactNode
  renderDeleteForm?: (props: { item: T; close: () => void }) => React.ReactNode
  editTitle?: string
  deleteTitle?: string
  deleteDescription?: string
}

export function TableRowActions<T>({
  item,
  actions = [],
  renderEditForm,
  renderDeleteForm,
  editTitle = 'Editar',
  deleteTitle = 'Excluir',
  deleteDescription = 'Você tem certeza que deseja excluir este registro?',
}: TableRowActionsProps<T>) {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const defaultActions: ActionItem<T>[] = []

  if (renderEditForm) {
    defaultActions.push({
      label: editTitle,
      icon: <SquarePen className='h-4 w-4' />,
      onClick: () => setIsEditOpen(true),
    })
  }

  if (renderDeleteForm) {
    defaultActions.push({
      label: deleteTitle,
      icon: <Trash2 className='h-4 w-4' />,
      onClick: () => setIsDeleteOpen(true),
      variant: 'danger',
    })
  }

  const combinedActions = [...actions, ...defaultActions]

  return (
    <>
      {renderEditForm && (
        <ResponsiveDialog
          isOpen={isEditOpen}
          setIsOpen={setIsEditOpen}
          title={editTitle}
        >
          {renderEditForm({ item, close: () => setIsEditOpen(false) })}
        </ResponsiveDialog>
      )}

      {renderDeleteForm && (
        <ResponsiveDialog
          isOpen={isDeleteOpen}
          setIsOpen={setIsDeleteOpen}
          title={deleteTitle}
          description={deleteDescription}
        >
          {renderDeleteForm({ item, close: () => setIsDeleteOpen(false) })}
        </ResponsiveDialog>
      )}

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
          {combinedActions.map((action, index) => (
            <DropdownMenuItem
              key={index}
              onClick={() => action.onClick?.(item)}
              className={`group text-sm p-2 flex items-center gap-2 ${
                action.variant === 'danger' ? 'text-red-500' : 'text-neutral-600'
              }`}
            >
              {action.icon}
              {action.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
