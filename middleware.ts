import { cookies } from 'next/headers'
import NextAuth from 'next-auth'

import authConfig from '@/auth.config'
import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from '@/routes'

const { auth } = NextAuth(authConfig)

export default auth(async (req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  const cookieStore = await cookies()
  const isDob = !!cookieStore.get('dateOfBirth')

  if (isApiAuthRoute) {
    return null
  }

  if (
    (!isDob && (nextUrl.pathname == '/auth/age-verification')) ||
    (!isDob && (nextUrl.pathname == '/restricao-idade')) ||
    (!isDob && isLoggedIn)
  ) {
    return null
  }

  if (!isDob && !isLoggedIn) {
    return Response.redirect(new URL('/auth/age-verification', nextUrl))
  }

  if ((nextUrl.pathname == '/auth/age-verification') && isDob) {
    return Response.redirect(new URL('/', nextUrl))
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return null
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL('/auth/login', nextUrl))
  }

  return null
})

// opcionalmente não chama o middleware nesses caminhos abaixo
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api)(.*)'],
}
