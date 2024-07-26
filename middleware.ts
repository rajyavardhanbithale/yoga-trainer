import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from "./utils/supabase/server";

export default async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname

    const supabase = createClient()
    const { data: user, error } = await supabase.auth.getUser()

    if (path === '/dashboard') {
        if (!user || error) {
            return NextResponse.redirect(new URL('/login', request.nextUrl))
        }
    }

    if (path === '/login') {
        if (user && !error) {
            return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
        }
    }

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
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};