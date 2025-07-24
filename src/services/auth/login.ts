'use server'

import { cookies } from 'next/headers'
import { LoginRequest, LoginResponse } from '@/types/login'
import { api } from '@/infra'

export async function login({ email, password }: LoginRequest) {
  try {
    const response = await api.post<LoginResponse, LoginRequest>('/auth/login', {
      email,
      password,
    })

    if (response.statusCode === 200) {
      const token = response.body?.accessToken
      const cookieStore = await cookies()

      if (token) {
        cookieStore.set('token', token, {
          httpOnly: true,
          secure: true,
          expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
          path: '/',
          sameSite: 'strict',
        })
      } else {
        throw new Error('Token is undefined')
      }

      const redirectTo = cookieStore.get('redirectTo')?.value || '/'
      if (redirectTo !== '/') {
        cookieStore.delete('redirectTo')
      }

      return { response, redirectTo }
    }
  } catch (err: any) {
    throw new Error('E-mail ou senha inválido')
  }
}
