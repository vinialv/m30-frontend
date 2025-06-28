'use client'

import { ResponsiveDialogProps } from '@/types/responsive-dialog'

import { useMediaQuery } from '@/hooks/useMediaQuery'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'

export function ResponsiveDialog({
  title,
  description,
  isOpen,
  setIsOpen,
  children,
}: ResponsiveDialogProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  return (
    <>
      {isDesktop ? (
        <Dialog
          open={isOpen}
          onOpenChange={setIsOpen}
        >
          <DialogTrigger asChild></DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              {description && <DialogDescription>{description}</DialogDescription>}
            </DialogHeader>
            {children}
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer
          open={isOpen}
          onOpenChange={setIsOpen}
        >
          <DrawerContent>
            <DrawerHeader className='text-left'>
              <DrawerTitle>{title}</DrawerTitle>
              {description && <DialogDescription>{description}</DialogDescription>}
            </DrawerHeader>
            <div className='max-h-[425px] overflow-y-auto'>
              {children}
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant='outline'>Cancelar</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </>
  )
}
