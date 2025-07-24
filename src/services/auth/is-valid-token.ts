import { jwtVerify, type JWTPayload } from 'jose'

const SECRET = new TextEncoder().encode(process.env.JWT_KEY)

export async function isValidToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET)
    return payload
  } catch (err) {
    console.error('Token inválido:', err)
    return null
  }
}
