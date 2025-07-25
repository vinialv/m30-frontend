'use client'

import { useActionState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { FormActionResponse, ProjectCategoryProps } from '@/types/project-categories'
import { createCategoryAction } from '../../app/(dashboard)/project-categories/actions/create'
import { updateCategoryAction } from '../../app/(dashboard)/project-categories/actions/update'
import { useToast } from '@/hooks/useToast'

interface Props {
  mode: 'insert' | 'update'
  id?: number
  data?: ProjectCategoryProps
  closeModal?: () => void
}

export function ProjectCategoryForm({ mode, id, data, closeModal }: Props) {
  const { toastSuccess, toastError } = useToast()
  const action = mode === 'update' && id ? updateCategoryAction : createCategoryAction

  const [state, formAction, isPending] = useActionState<FormActionResponse, FormData>(action, {})

  useEffect(() => {
    if (Object.keys(state).length === 0) return

    if (state?.success) {
      toastSuccess(state?.message || 'Operação realizada com sucesso.')
      closeModal?.()
    } else if (state?.statusCode) {
      toastError(state?.message || 'Ocorreu um erro ao processar a solicitação.')
    }
  }, [state])

  return (
    <form
      action={formAction}
      className='flex flex-col gap-4 px-4'
    >
      <Input
        name='id'
        type='hidden'
        value={data?.id || ''}
      />
      <div className='flex flex-col gap-1'>
        <Label htmlFor='description'>Descrição</Label>
        <Input
          name='description'
          id='description'
          defaultValue={data?.description}
          aria-invalid={!!state?.errors?.description}
        />
        {state?.errors?.description && (
          <p className='text-red-500 text-sm'>{state.errors.description}</p>
        )}
      </div>

      {mode === 'update' && (
        <div className='flex flex-col gap-1'>
          <Label htmlFor='status'>Status</Label>
          <Select
            name='status'
            defaultValue={data?.status || 'A'}
          >
            <SelectTrigger>
              <SelectValue placeholder='Selecione o status' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='A'>Ativo</SelectItem>
              <SelectItem value='I'>Inativo</SelectItem>
            </SelectContent>
          </Select>
          {state?.errors?.status && <p className='text-red-500 text-sm'>{state.errors.status}</p>}
        </div>
      )}

      <Button
        type='submit'
        className='w-full'
        disabled={isPending}
      >
        {isPending ? <Loader2 className='size-4 animate-spin' /> : 'Salvar'}
      </Button>
    </form>
  )
}
