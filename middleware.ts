import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { AUTH_COOKIE_NAME, PROTECTED_ROUTES_PREFIXES, LOGIN_ROUTE } from './lib/auth/constants'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  console.log(`Middleware checking path: ${path}`)

  // Check if the current path starts with any of the protected prefixes
  const isProtectedRoute = PROTECTED_ROUTES_PREFIXES.some(prefix => path.startsWith(prefix))

  const authToken = request.cookies.get(AUTH_COOKIE_NAME)?.value

  if (isProtectedRoute && !authToken) {
    console.log(`Access denied to ${path}. Redirecting to ${LOGIN_ROUTE}`)
    const loginUrl = new URL(LOGIN_ROUTE, request.url)
    loginUrl.searchParams.set('callbackUrl', path)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
