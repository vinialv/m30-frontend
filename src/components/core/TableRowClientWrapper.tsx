'use client'

import { GenericDeleteForm } from '@/forms/GenericDeleteForm'
import { TableRowActions } from './TableRowActions'

type Props<T> = {
  item: T
  id: number
  editFormComponent: (close: () => void) => React.ReactNode
}

export function TableRowClientWrapper<T>({ item, id, editFormComponent }: Props<T>) {
  return (
    <TableRowActions
      item={item}
      editFormComponent={editFormComponent}
      deleteFormComponent={(close) => (
        <GenericDeleteForm
          id={id}
          closeModal={close}
        />
      )}
    />
  )
}
