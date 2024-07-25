
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

import CryptoJS from "crypto-js";
import { mealData } from "./mealData";

const USERDB = process.env.NEXT_PUBLIC_SUPABASE_DATABASE_USER_PROFILE!

interface MealCount {
    name: string
    count: number
    image: string
}

export async function GET(req: NextRequest) {
    const supabase = createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()
    const userID: string | null = user ? CryptoJS.MD5(user.id).toString() : null

    const { data: userRecord, error: fetchError } = await supabase
        .from(USERDB)
        .select('diet')
        .eq('userID', userID)
        .single()

    const fat: number[] = userRecord?.diet.map((item: any) => item.fat) || []
    const carb: number[] = userRecord?.diet.map((item: any) => item.carb) || []
    const calorie: number[] = userRecord?.diet.map((item: any) => item.calorie) || []
    const protein: number[] = userRecord?.diet.map((item: any) => item.protein) || []
    const dates: number[] = userRecord?.diet.map((item: any) => item.id) || []

    const response = {
        fat: fat,
        carb: carb,
        calorie: calorie,
        protein: protein,
        dates: dates
    }

    // user diet data
    const favMeal: MealCount[] = []
    const mealCountMap: { [key: string]: number } = {};
    userRecord?.diet.forEach((item: { name: string }) => {
        if (mealCountMap[item.name]) {
            mealCountMap[item.name] += 1;
        } else {
            mealCountMap[item.name] = 1;
        }
    });
    for (const [name, count] of Object.entries(mealCountMap)) {
        favMeal.push({
            name,
            count,
            image: mealData.filter((item) => item.name === name)[0].image || 'default.webp'
        });
    }
    favMeal.sort((a, b) => b.count - a.count);
    
    return NextResponse.json({ response, favMeal });
}