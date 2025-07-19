'use client'

import { useActionState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'
import { useToast } from '@/hooks/useToast'
import { FormActionResponse } from '@/types/project-categories'
import { useRouter } from 'next/navigation'

interface GenericDeleteFormProps {
  id: number
  action: (formData: FormData) => Promise<any>
  closeModal?: () => void
}

export function GenericDeleteForm({ id, action, closeModal }: GenericDeleteFormProps) {
  const router = useRouter()
  const { toastSuccess, toastError } = useToast()
  const [state, formAction, isPending] = useActionState<FormActionResponse, FormData>(
    async (_state, formData) => await action(formData),
    {}
  )

  console.log(state)

  useEffect(() => {
    if (Object.keys(state).length === 0) return

    if (state?.success) {
      toastSuccess(state?.message || 'Registro excluído com sucesso.')
      closeModal?.()
      router.refresh()
    } else if (state?.statusCode) {
      toastError(state?.message || 'Erro ao excluir o registro.')
    }
  }, [state])

  return (
    <form action={formAction}>
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
