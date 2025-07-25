'use client'

import { Dispatch, ReactNode, SetStateAction, useState } from 'react'
import { ResponsiveDialog } from '@/components/core/ResponsiveDialog'

type Props = {
  title: string
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  children: (close: () => void) => ReactNode
}

export function EditDialogWrapper({ title, isOpen, setIsOpen, children }: Props) {
  return (
    <ResponsiveDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={title}
    >
      {children(() => setIsOpen(false))}
    </ResponsiveDialog>
  )
}
