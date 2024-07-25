import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { type CookieOptions, createServerClient } from '@supabase/ssr'
import { createUserForDatabase, postAuth } from './postAuth'

export async function GET(request: Request) {
    let { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    // if "next" is in param, use it as the redirect URL
    const next = searchParams.get('next') ?? '/'

    origin = process.env.NEXT_PUBLIC_SUPABASE_ORIGIN ?? origin

    if (code) {
        const cookieStore = cookies()
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    get(name: string) {
                        return cookieStore.get(name)?.value
                    },
                    set(name: string, value: string, options: CookieOptions) {
                        cookieStore.set({ name, value, ...options })
                    },
                    remove(name: string, options: CookieOptions) {
                        cookieStore.delete({ name, ...options })
                    },
                },
            }
        )
        const { error, data } = await supabase.auth.exchangeCodeForSession(code)
        if (!error) {
            // adding new configuration to user-db
            // using false wale because it check if the user created time is
            // greater than Threshold time (in seconds)
            // false if the user is created in the last 6 minutes
            if (!(await postAuth(data.user.created_at, 300))) {
                await createUserForDatabase(data.user)
            }

            return NextResponse.redirect(`${origin}${next}`)
        }
    }

    // return the user to an error page with instructions
    return NextResponse.redirect(
        `${origin}/login?message=Could not login with provider`
    )
}
