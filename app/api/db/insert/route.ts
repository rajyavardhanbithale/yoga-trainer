import { NextRequest, NextResponse } from 'next/server'
import { APIYogaPosePerformanceData } from '@/types'
import CryptoJS from 'crypto-js'
import { createClient } from '@/utils/supabase/server'

const poseAnalysis = process.env.NEXT_PUBLIC_SUPABASE_DATABASE_POSE_ANALYSIS!

export async function POST(request: NextRequest) {
    const body: APIYogaPosePerformanceData = await request.json()

    const supabase = createClient()

    const { error } = await supabase.from(poseAnalysis).insert(body)

    if (error) {
        console.log(error)

        return NextResponse.json(
            {
                message: 'error in inserting data to database',
            },
            {
                status: 500,
            }
        )
    }

    return NextResponse.json(
        {
            message: 'data inserted',
        },
        {
            status: 200,
        }
    )
}
