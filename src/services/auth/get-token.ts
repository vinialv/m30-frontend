'use server'

import { cookies } from 'next/headers'
import { isValidToken } from './is-valid-token'

export async function getToken() {
  try {
    const cookieStore = await cookies()
    const tokenJWT = cookieStore.get('token')?.value
    if (tokenJWT) {
      const payload = await isValidToken(tokenJWT)
      if (payload) {
        return tokenJWT
      }
    }
  } catch (error) {
    console.error('Error retrieving token:', error)
    return null
  }
}
