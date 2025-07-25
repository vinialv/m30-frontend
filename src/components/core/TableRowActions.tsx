'use client'

import { useState, useMemo } from 'react'
import { SquarePen, Trash2 } from 'lucide-react'
import { EditDialogWrapper } from './EditDialogWrapper'
import { DeleteDialogWrapper } from './DeleteDialogWrapper'
import { ActionMenu } from './ActionMenu'

type ActionItem<T> = {
  label: string
  icon?: React.ReactNode
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
  editFormComponent?: (close: () => void) => React.ReactNode
  deleteFormComponent?: (close: () => void) => React.ReactNode
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
    const defaults: ActionItem<T>[] = []

    if (editFormComponent) {
      defaults.push({
        label: editTitle,
        icon: <SquarePen className='h-4 w-4' />,
        onClick: () => setIsEditOpen(true),
      })
    }

    if (deleteFormComponent) {
      defaults.push({
        label: deleteTitle,
        icon: <Trash2 className='h-4 w-4' />,
        onClick: () => setIsDeleteOpen(true),
        variant: 'danger',
      })
    }

    return defaults
  }, [editFormComponent, deleteFormComponent, editTitle, deleteTitle])

  return (
    <>
      {editFormComponent && (
        <EditDialogWrapper
          title={editTitle}
          isOpen={isEditOpen}
          setIsOpen={setIsEditOpen}
        >
          {(close) => editFormComponent(close)}
        </EditDialogWrapper>
      )}

      {deleteFormComponent && (
        <DeleteDialogWrapper
          title={deleteTitle}
          description={deleteDescription}
          isOpen={isDeleteOpen}
          setIsOpen={setIsDeleteOpen}
        >
          {(close) => deleteFormComponent(close)}
        </DeleteDialogWrapper>
      )}

      <ActionMenu
        item={item}
        actions={[...actions, ...defaultActions]}
      />
    </>
  )
}
