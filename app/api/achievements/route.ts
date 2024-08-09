import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import CryptoJS from 'crypto-js'
const USERDB = process.env.NEXT_PUBLIC_SUPABASE_DATABASE_USER_PROFILE!

const authCookieKey = process.env.NEXT_AUTH_COOKIE_KEY!
const aesSalt = process.env.NEXT_PUBLIC_AES_SALT!

async function getUserIDCookie(cookie: string | undefined) {
    try {
        if (cookie !== undefined) {
            const aesEncrypted = CryptoJS.AES.decrypt(cookie, aesSalt).toString(CryptoJS.enc.Utf8)
            
            return aesEncrypted
        }else{
            
            return NextResponse.json({ message: 'error in fetching data from database' }, { status: 400 })    
        }
    } catch {
        
        return NextResponse.json({ message: 'error in fetching data from database' }, { status: 400 })
    }
}


export async function GET(request: NextRequest) {
    const supabase = createClient()

    const cookie = request.cookies.get(authCookieKey)

    const userIdMD5 = await getUserIDCookie(cookie?.value)


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
