import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from './utils/supabase/server'
import CryptoJS from 'crypto-js'

const authCookieKey = process.env.NEXT_AUTH_COOKIE_KEY!
const aesSalt = process.env.NEXT_PUBLIC_AES_SALT!

async function getUserIDCookie(
    supabase: ReturnType<typeof createClient>,
    request: NextRequest,
    response: NextResponse
) {
    const cookies = request.cookies
    const key = cookies.get(authCookieKey)

    try {
        if (key === undefined) {
            const { data: user, error } = await supabase.auth.getUser()
            if (user.user && !error) {
                const userID = user.user.id
                // stage 1 - encrypt user ID to md5
                const userIDMD5 = CryptoJS.MD5(userID).toString()

                // stage 2 - encrypt user ID to AES
                const aesEncrypted = CryptoJS.AES.encrypt(
                    userIDMD5,
                    aesSalt!
                ).toString()

                response.cookies.set(authCookieKey, aesEncrypted)
                return response
            }

            if (!user && error) {
                console.log('error')
            }
        }

        if (key !== undefined) {
            const { data: user, error } = await supabase.auth.getSession()

            if (!user.session) {
                response.cookies.delete(authCookieKey)
                return response
            }
        }
    } catch {
        return response
    }
}

export default async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const response = NextResponse.next()
    const supabase = createClient()

    const { data: user, error } = await supabase.auth.getSession()

    if (path === '/dashboard') {
        if (!user.session || error) {
            return NextResponse.redirect(new URL('/login', request.nextUrl))
        }
    }

    if (path === '/login') {
        if (user.session && !error) {
            return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
        }
    }

    return getUserIDCookie(supabase, request, response)
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
