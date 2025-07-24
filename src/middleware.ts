import { jwtDecode } from 'jwt-decode'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse, type MiddlewareConfig } from 'next/server'
import { isValidToken } from './services/auth/is-valid-token'

const publicRoutes = [{ path: '/login', whenAuthenticated: 'redirect' }] as const

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = '/login'
const BASE_URL = '/'

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const publicRoute = publicRoutes.find((route) => route.path === path)
  const authToken = request.cookies.get('token')

  if (!authToken && publicRoute) {
    return NextResponse.next()
  }

  if (!authToken && !publicRoute) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.search = ''
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE

    const response = NextResponse.redirect(redirectUrl)

    response.cookies.set('redirectTo', request.nextUrl.clone().toString(), {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 5,
    })

    return response
  }

  const payload = await isValidToken(authToken?.value || '')

  if (!payload) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE

    const response = NextResponse.redirect(redirectUrl)
    response.cookies.delete('token')
    return response
  }

  if (authToken && publicRoute && publicRoute.whenAuthenticated === 'redirect') {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = BASE_URL

    return NextResponse.redirect(redirectUrl)
  }

  if (authToken && !publicRoute) {
    try {
      const decodedToken = jwtDecode(authToken.value)
      const currentDate = Math.floor(Date.now() / 1000)
      if (decodedToken.exp != null) {
        const expirationDate = decodedToken.exp
        if (expirationDate < currentDate) {
          const redirectUrl = request.nextUrl.clone()
          redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE

          return NextResponse.redirect(redirectUrl)
        }
      }
      return NextResponse.next()
    } catch {
      throw new Error('erro ao decodificar token no middleware')
    }
  }
}

export const config: MiddlewareConfig = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)'],
}
