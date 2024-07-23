'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { Provider } from '@supabase/supabase-js'
import { getURL } from '@/utils/helper'

export async function oAuthSignIn(provider: Provider) {
    if (!provider) {
        return redirect('/login?message=No provider selected')
    }

    const supabase = createClient()
    const redirectUrl = getURL('/auth/callback')
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
            redirectTo: redirectUrl,
        },
    })

    if (error) {
        redirect('/login?message=Could not authenticate user')
    }

    return redirect(data.url)
}
