'use client'

import { useActionState, useEffect, useState } from 'react'
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

import { FormActionResponse, CustomerProps } from '@/types/customers'
import { createCustomerAction } from '../../app/(dashboard)/customers/actions/create'
import { updateCustomerAction } from '../../app/(dashboard)/customers/actions/update'
import { useToast } from '@/hooks/useToast'

import { getStates, getCitiesByStateId, getStateByUf } from '@/data/brazil'
import { City, State } from '@/data/brazil/types'

interface Props {
  mode: 'insert' | 'update'
  id?: number
  data?: CustomerProps
  closeModal?: () => void
}

export function CustomerForm({ mode, id, data, closeModal }: Props) {
  const initialStateId = data?.city?.state?.id ?? ''
  const initialCityId = data?.city?.id ?? ''

  const [stateId, setStateId] = useState<number | ''>(initialStateId)
  const [cityId, setCityId] = useState<number | ''>(initialCityId)

  const [states, setStates] = useState<State[]>([])
  const [cities, setCities] = useState<City[]>([])

  useEffect(() => {
    setStates(getStates())
  }, [])

  useEffect(() => {
    if (typeof stateId === 'number') {
      const filtered = getCitiesByStateId(stateId)
      setCities(filtered)

      if (!filtered.find((city) => city.id === cityId)) {
        setCityId('')
      }
    } else {
      setCities([])
      setCityId('')
    }
  }, [stateId])

  const { toastSuccess, toastError } = useToast()
  const action = mode === 'update' && id ? updateCustomerAction : createCustomerAction

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

      {/* Nome */}
      <div className='flex flex-col gap-1'>
        <Label htmlFor='name'>Nome</Label>
        <Input
          name='name'
          id='name'
          defaultValue={data?.name || ''}
          aria-invalid={!!state?.errors?.name}
        />
        {state?.errors?.name && <p className='text-red-500 text-sm'>{state.errors.name}</p>}
      </div>

      {/* Email */}
      <div className='flex flex-col gap-1'>
        <Label htmlFor='email'>E-mail</Label>
        <Input
          name='email'
          id='email'
          type='email'
          defaultValue={data?.email || ''}
          aria-invalid={!!state?.errors?.email}
        />
        {state?.errors?.email && <p className='text-red-500 text-sm'>{state.errors.email}</p>}
      </div>

      {/* Telefone */}
      <div className='flex flex-col gap-1'>
        <Label htmlFor='phone'>Telefone</Label>
        <Input
          name='phone'
          id='phone'
          type='tel'
          defaultValue={data?.phone || ''}
          aria-invalid={!!state?.errors?.phone}
        />
        {state?.errors?.phone && <p className='text-red-500 text-sm'>{state.errors.phone}</p>}
      </div>

      {/* Estado */}
      <div className='flex flex-col gap-1'>
        <Label htmlFor='state'>Estado</Label>
        <input
          type='hidden'
          name='state'
          value={stateId}
        />
        <Select
          onValueChange={(uf) => {
            const selected = getStateByUf(uf)
            setStateId(selected?.id || '')
          }}
          defaultValue={data?.city?.state?.uf || ''}
        >
          <SelectTrigger>
            <SelectValue placeholder='Selecione o estado' />
          </SelectTrigger>
          <SelectContent>
            {states.map((state) => (
              <SelectItem
                key={state.id}
                value={state.uf}
              >
                {state.name} - {state.uf}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {state?.errors?.state && <p className='text-red-500 text-sm'>{state.errors.state}</p>}
      </div>

      {/* Cidade */}
      <div className='flex flex-col gap-1'>
        <Label htmlFor='city'>Cidade</Label>
        <input
          type='hidden'
          name='city'
          value={cityId}
        />
        <Select
          onValueChange={(id) => setCityId(parseInt(id))}
          value={cityId !== '' ? String(cityId) : ''}
          disabled={!stateId}
        >
          <SelectTrigger>
            <SelectValue placeholder='Selecione a cidade' />
          </SelectTrigger>
          <SelectContent>
            {cities.map((city) => (
              <SelectItem
                key={city.id}
                value={String(city.id)}
              >
                {city.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {state?.errors?.city && <p className='text-red-500 text-sm'>{state.errors.city}</p>}
      </div>

      {/* Status (somente update) */}
      {mode === 'update' && (
        <div className='flex flex-col gap-1'>
          <Label htmlFor='status'>Situação</Label>
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

      {/* Botão */}
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
