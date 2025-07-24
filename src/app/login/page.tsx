'use client'

import { Card } from '@/components/ui/card'
import { useTheme } from 'next-themes'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useActionState, useEffect } from 'react'
import M30 from '@/components/m30'
import { loginAction } from './actions/login'
import { useToast } from '@/hooks/useToast'
import { useRouter } from 'next/navigation'
import FocusLock from 'react-focus-lock'

type LoginProps = {
  email: string
  password: string
}

interface Response {
  success?: boolean
  statusCode?: number
  message?: string
  data?: LoginProps | FormData
  errors?: {
    email?: string[]
    password?: string[]
  }
  redirectTo?: string
}

export default function page() {
  const { theme, systemTheme } = useTheme()
  const isDark = theme === 'dark' || (theme === 'system' && systemTheme === 'dark')
  const { toastSuccess, toastError } = useToast()
  const router = useRouter()

  const [state, formAction, isPending] = useActionState<Response, FormData>(loginAction, {
    success: false,
    message: '',
  })

  useEffect(() => {
    if (Object.keys(state).length === 0) return

    if (state?.success) {
      router.push(state.redirectTo || '/')
    } else if (state?.statusCode) {
      toastError(state?.message || 'Erro ao realizar login, tente novamente.')
    }
  }, [state])

  return (
    <Card className='py-12 px-8 min-w-80'>
      <div className='flex justify-center'>
        <M30 fill={`${isDark ? 'oklch(0.985 0 0)' : 'oklch(0.205 0 0)'}`} />
      </div>
      <div className='mt-2'>
        <FocusLock>
          <form
            action={formAction}
            className='flex flex-col gap-4 px-4'
          >
            <div className='flex flex-col gap-1'>
              <Label htmlFor='email'>E-mail</Label>
              <Input
                name='email'
                id='email'
                type='email'
                aria-invalid={!!state?.errors?.email}
              />
              {state?.errors?.email && (
                <p className='text-red-500 text-sm'>{state.errors.email.join(', ')}</p>
              )}
            </div>
            <div className='flex flex-col gap-1'>
              <Label htmlFor='password'>Senha</Label>
              <Input
                name='password'
                id='password'
                type='password'
                aria-invalid={!!state?.errors?.password}
              />
              {state?.errors?.password && (
                <p className='text-red-500 text-sm'>{state.errors.password.join(', ')}</p>
              )}
            </div>

            <Button
              type='submit'
              className='w-full'
              disabled={isPending}
            >
              {isPending ? <Loader2 className='size-4 animate-spin' /> : 'Salvar'}
            </Button>
          </form>
        </FocusLock>
      </div>
    </Card>
  )
}
