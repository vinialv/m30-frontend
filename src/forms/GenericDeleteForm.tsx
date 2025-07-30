'use client'

import { startTransition, useActionState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'
import { useToast } from '@/hooks/useToast'
import { revalidateCache } from '@/actions/revalidate-cache'
import { FormActionResponse, GenericDeleteFormProps } from '@/types/shared'

export function GenericDeleteForm({ id, path, closeModal, deleteAction }: GenericDeleteFormProps) {
  const { toastSuccess, toastError } = useToast()

  const [state, handleDeleteAction, isPending] = useActionState<FormActionResponse, FormData>(
    deleteAction,
    {}
  )

  useEffect(() => {
    if (Object.keys(state).length === 0) return

    if (state?.success) {
      toastSuccess(state?.message || 'Registro excluído com sucesso.')
      closeModal?.()
      startTransition(() => {
        setTimeout(() => {
          revalidateCache(path)
        }, 0)
      })
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
