'use client'

import { TableRowClientWrapper } from '@/components/core/TableRowClientWrapper'
import { CustomerForm } from '@/components/customers/CustomerCreateUpdateForm'
import { CustomerProps } from '@/types/customers'
import { deleteCustomerAction } from '@/app/(dashboard)/customers/actions/delete'
import { TableRowSetupProps } from '@/types/shared'

export function CustomerTableRowSetup({ item }: TableRowSetupProps<CustomerProps>) {
  return (
    <TableRowClientWrapper<CustomerProps>
      item={item}
      id={item.id}
      path={'/customers'}
      deleteAction={deleteCustomerAction}
      editFormComponent={(close) => (
        <CustomerForm
          key={item.id}
          mode='update'
          id={item.id}
          data={item}
          closeModal={close}
        />
      )}
    />
  )
}
