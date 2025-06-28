import { NextRequest, NextResponse, type MiddlewareConfig } from 'next/server'

export function middleware(request: NextRequest) {
  return NextResponse.next()
}

export const config: MiddlewareConfig = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)'],
}
