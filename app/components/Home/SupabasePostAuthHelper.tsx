'use client'
import { createClientBrowser } from '@/utils/supabase/client'
import { createUserForDatabase, postAuth } from '@/app/auth/callback/postAuth'
import { useEffect } from 'react'
export default function SupabasePostAuthHelper() {
    const supabase = createClientBrowser()
    const postAuthFunction = async () => {
        const {
            data: { user },
            error,
        } = await supabase.auth.getUser()

        if (user) {
            // adding new configuration to user-db
            // using false wale because it check if the user created time is
            // greater than Threshold time (in seconds)
            // false if the user is created in the last 2 minutes
            if (!(await postAuth(user?.created_at, 120))) {
                createUserForDatabase(user)
            }
        }
    }
    useEffect(() => {
        postAuthFunction()
    }, [])

    return <></>
}
