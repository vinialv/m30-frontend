'use client'

import { CustomerProps } from '@/types/customers'
import { CustomerForm } from '@/components/customers/CustomerCreateUpdateForm'

type Props = {
  item: CustomerProps
  closeModal: () => void
}

export function CustomerEditFormWrapper({ item, closeModal }: Props) {
  return (
    <CustomerForm
      key={item.id}
      mode='update'
      id={item.id}
      data={item}
      closeModal={closeModal}
    />
  )
}
