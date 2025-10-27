import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Protected routes that require authentication
  const protectedRoutes = [
    '/materials',
    '/mcq-cbt',
    '/mcq-practice',
    '/mcq-test'
  ]

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route))

  if (isProtectedRoute) {
    // Get the session from cookies
    const userSessionCookie = request.cookies.get('userSession')
    const adminSessionCookie = request.cookies.get('adminSession')

    // If neither user nor admin session exists, redirect to login
    if (!userSessionCookie && !adminSessionCookie) {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      url.searchParams.set('redirect', path)
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}

