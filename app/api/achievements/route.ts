import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import CryptoJS from 'crypto-js'
const USERDB = process.env.NEXT_PUBLIC_SUPABASE_DATABASE_USER_PROFILE!

export async function GET(req: NextRequest) {
    const supabase = createClient()

    const userInfo = await supabase.auth.getUser()
    const userID = userInfo?.data?.user?.id

    const userIdMD5 = userID && CryptoJS.MD5(userID).toString()

    const { data, error } = await supabase
        .from(USERDB)
        .select('achievements')
        .eq('userID', userIdMD5)

    

    const achievements = data && data[0]?.achievements

    return NextResponse.json(
        {
            achievements,
        },
        { status: 200 }
    )
}
