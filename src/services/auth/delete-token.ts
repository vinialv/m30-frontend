'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function deleteToken() {
  const cookieStore = await cookies()
  cookieStore.delete('token')
  redirect('/login')
}
