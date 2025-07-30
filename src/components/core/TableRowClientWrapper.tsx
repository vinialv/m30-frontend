'use client'

import { GenericDeleteForm } from '@/forms/GenericDeleteForm'
import { TableRowActions } from './TableRowActions'
import { TableRowClientWrapperProps } from '@/types/shared'

export function TableRowClientWrapper<T>({
  item,
  id,
  path,
  editFormComponent,
  deleteAction,
}: TableRowClientWrapperProps<T>) {
  return (
    <TableRowActions
      item={item}
      editFormComponent={editFormComponent}
      deleteFormComponent={(close) => (
        <GenericDeleteForm
          id={id}
          path={path}
          closeModal={close}
          deleteAction={deleteAction}
        />
      )}
    />
  )
}
