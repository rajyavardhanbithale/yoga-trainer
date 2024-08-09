import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

import CryptoJS from 'crypto-js'
import { mealData } from './mealData'

const USERDB = process.env.NEXT_PUBLIC_SUPABASE_DATABASE_USER_PROFILE!
const authCookieKey = process.env.NEXT_AUTH_COOKIE_KEY!
const aesSalt = process.env.NEXT_PUBLIC_AES_SALT!

interface MealCount {
    name: string
    count: number
    image: string
}

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

    const cookie = request.cookies.get(authCookieKey)

    const supabase = createClient()

    // stage 1 - extract user ID information
    const userID = await getUserIDCookie(cookie?.value)

    const { data: userRecord, error: fetchError } = await supabase
        .from(USERDB)
        .select('diet')
        .eq('userID', userID)
        .single()

    const fat: number[] = userRecord?.diet.map((item: any) => item.fat) || []
    const carb: number[] = userRecord?.diet.map((item: any) => item.carb) || []
    const calorie: number[] =
        userRecord?.diet.map((item: any) => item.calorie) || []
    const protein: number[] =
        userRecord?.diet.map((item: any) => item.protein) || []
    const dates: number[] = userRecord?.diet.map((item: any) => item.id) || []

    const response = {
        fat: fat,
        carb: carb,
        calorie: calorie,
        protein: protein,
        dates: dates,
    }

    // user diet data
    const favMeal: MealCount[] = []
    const mealCountMap: { [key: string]: number } = {}
    userRecord?.diet.forEach((item: { name: string }) => {
        if (mealCountMap[item.name]) {
            mealCountMap[item.name] += 1
        } else {
            mealCountMap[item.name] = 1
        }
    })
    for (const [name, count] of Object.entries(mealCountMap)) {
        favMeal.push({
            name,
            count,
            image:
                mealData.filter((item) => item.name === name)[0]?.image ||
                'default.png',
        })
    }
    favMeal.sort((a, b) => b.count - a.count)

    return NextResponse.json({ response, favMeal })
}
