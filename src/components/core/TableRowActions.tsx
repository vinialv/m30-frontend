'use client'

import { useState, useMemo, cloneElement, isValidElement, ReactNode, ReactElement } from 'react'
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
  icon?: ReactNode
  onClick?: (item: T) => void
  variant?: 'default' | 'danger'
  disabled?: boolean
}

type TableRowActionsProps<T> = {
  item: T
  actions?: ActionItem<T>[]
  editTitle?: string
  deleteTitle?: string
  deleteDescription?: string
  editFormComponent?: ReactNode
  deleteFormComponent?: ReactNode
}

export function TableRowActions<T>({
  item,
  actions = [],
  editTitle = 'Editar',
  deleteTitle = 'Excluir',
  deleteDescription = 'Você tem certeza que deseja excluir este registro?',
  editFormComponent,
  deleteFormComponent,
}: TableRowActionsProps<T>) {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const defaultActions = useMemo((): ActionItem<T>[] => {
    const defaultItems: ActionItem<T>[] = []

    if (editFormComponent) {
      defaultItems.push({
        label: editTitle,
        icon: <SquarePen className='h-4 w-4' />,
        onClick: () => setIsEditOpen(true),
      })
    }

    if (deleteFormComponent) {
      defaultItems.push({
        label: deleteTitle,
        icon: <Trash2 className='h-4 w-4' />,
        onClick: () => setIsDeleteOpen(true),
        variant: 'danger',
      })
    }

    return defaultItems
  }, [editFormComponent, deleteFormComponent, editTitle, deleteTitle])

  const combinedActions = [...actions, ...defaultActions]

  function injectClose(child: ReactNode, closeFn: () => void): ReactNode {
    if (isValidElement<{ closeModal: () => void }>(child)) {
      return cloneElement(child, { closeModal: closeFn })
    }
    return child
  }

  return (
    <>
      {editFormComponent && (
        <ResponsiveDialog
          isOpen={isEditOpen}
          setIsOpen={setIsEditOpen}
          title={editTitle}
        >
          {injectClose(editFormComponent, () => setIsEditOpen(false))}
        </ResponsiveDialog>
      )}

      {deleteFormComponent && (
        <ResponsiveDialog
          isOpen={isDeleteOpen}
          setIsOpen={setIsDeleteOpen}
          title={deleteTitle}
          description={deleteDescription}
        >
          {injectClose(deleteFormComponent, () => setIsDeleteOpen(false))}
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
    </>
  )
}
