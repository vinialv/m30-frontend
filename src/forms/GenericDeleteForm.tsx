'use client'

import { useActionState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'
import { useToast } from '@/hooks/useToast'
import { deleteCategoryAction } from '@/app/(dashboard)/project-categories/actions/delete'
import { FormActionResponse } from '@/types/project-categories'

interface GenericDeleteFormProps {
  id: number
  closeModal?: () => void
}

export function GenericDeleteForm({ id, closeModal }: GenericDeleteFormProps) {
  const { toastSuccess, toastError } = useToast()

  const [state, handleDeleteAction, isPending] = useActionState<FormActionResponse, FormData>(
    deleteCategoryAction,
    {}
  )

  useEffect(() => {
    if (Object.keys(state).length === 0) return

    if (state?.success) {
      toastSuccess(state?.message || 'Registro excluído com sucesso.')
      closeModal?.()
    } else if (state?.statusCode) {
      toastError(state?.message || 'Erro ao excluir o registro.')
    }
  }, [state])

  return (
    <form action={handleDeleteAction}>
      <input
        type='hidden'
        name='id'
        value={id}
      />
      <div className='w-full flex justify-center md:space-x-6'>
        <Button
          size='lg'
          variant='outline'
          disabled={isPending}
          className='w-full hidden md:block'
          type='button'
          onClick={closeModal}
        >
          Cancelar
        </Button>
        <Button
          size='lg'
          type='submit'
          disabled={isPending}
          className='w-full bg-red-500 hover:bg-red-400 mx-4'
        >
          {isPending ? <LoaderCircle className='animate-spin' /> : 'Excluir'}
        </Button>
      </div>
    </form>
  )
}
