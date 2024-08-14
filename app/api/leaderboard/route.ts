export const dynamic = 'force-dynamic'

import { createClient } from '@/utils/supabase/server'
import { Redis } from '@upstash/redis'
import { NextRequest, NextResponse } from 'next/server'
import { CalculateMetrics } from './calculateMetrics'
import { nanoid } from '@reduxjs/toolkit'

const leaderboardUpdateTime = 5 // minutes
const redis = new Redis({
    url: process.env.NEXT_PUBLIC_UPSTASH_REDIS_URL,
    token: process.env.NEXT_PUBLIC_UPSTASH_REDIS_KEY,
})

interface Data {
    userID: string
    correctPose: number[]
    accuracy: number[]
    startTime: number
    endTime: number
    repTime: number
    duration: number
    'user-db': {
        name: string
        country: string
        profile_pic: string
        user_public_id: string
    }
}

async function handleCache(finalResponse: any) {
    await redis.set('leaderboard', JSON.stringify(finalResponse))
    return { source: 'supabase', ...finalResponse }
}

async function handleCacheUpdate() {
    const supabase = createClient()
    const { data } = await supabase.from('pose-performance-data').select(
        `
            userID,accuracy,correctPose,startTime,endTime,repTime,duration, 
            user-db(name,profile_pic,country,user_public_id)
            `
    )

    if (data) {
        const metrics = CalculateMetrics(data)
        const leaderboardUpdateTimeInMS = leaderboardUpdateTime * 60 * 1000
        const config = {
            updateID: nanoid(),
            updateInterval: leaderboardUpdateTimeInMS,
            lastUpdated: Date.now(),
            nextUpdate: Date.now() + leaderboardUpdateTimeInMS,
            totalUsers: metrics.length,
        }

        return handleCache({ config, metrics })
    }
    return { message: 'No data found' }
}

export async function GET(req: NextRequest, res: NextResponse) {
    // fetching data from redis
    const leaderboardDataRedis = (await redis.get('leaderboard')) as any

    // validating if data is present in redis
    if (leaderboardDataRedis) {
        // checking update time
        if (Date.now() < leaderboardDataRedis.config.nextUpdate) {
            return NextResponse.json(
                {source:"redis", ...leaderboardDataRedis},
           )
        }

        const updatedData = await handleCacheUpdate()
        if (updatedData.message === 'No data found') {
            return NextResponse.json(
                { message: 'No data found' },
                { status: 404 }
            )
        }

        return NextResponse.json(updatedData)
    }

    if (!leaderboardDataRedis) {
        const freshData = await handleCacheUpdate()
        if (freshData.message === 'No data found') {
            return NextResponse.json(
                { message: 'No data found' },
                { status: 404 }
            )
        }

        return NextResponse.json(freshData)
    } else {
        return NextResponse.json({ message: 'No data found' }, { status: 404 })
    }
}
