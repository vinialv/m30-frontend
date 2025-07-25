'use client'

import { ResponsiveDialog } from '@/components/core/ResponsiveDialog'

type Props = {
  title: string
  description: string
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  children: (close: () => void) => React.ReactNode
}

export function DeleteDialogWrapper({ title, description, isOpen, setIsOpen, children }: Props) {
  return (
    <ResponsiveDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={title}
      description={description}
    >
      {children(() => setIsOpen(false))}
    </ResponsiveDialog>
  )
}
