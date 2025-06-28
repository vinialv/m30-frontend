import { Dispatch, SetStateAction } from 'react'

export type ResponsiveDialogProps = {
  title: string
  description?: string
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  children: React.ReactNode
}
