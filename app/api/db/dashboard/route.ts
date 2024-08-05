import { NextRequest, NextResponse } from 'next/server'
import { poseInfo } from '../../pose/poseApiData'
import { YogaPoseAPI, DBFetchSupabase } from '@/types'
import CryptoJS from 'crypto-js'

import { createClient } from '@/utils/supabase/server'

const poseAnalysis = process.env.NEXT_PUBLIC_SUPABASE_DATABASE_POSE_ANALYSIS!

export async function GET(request: NextRequest) {
    const supabase = createClient()

    // stage 1 - extract user information
    const userInfo = await supabase.auth.getUser()
    const userID = userInfo?.data?.user?.id

    const userIdMD5 = userID && CryptoJS.MD5(userID).toString()

    // stage 2 - query from database
    const { data, error } = await supabase
        .from(poseAnalysis)
        .select('poseID, correctPose, startTime, userID')
        .eq('userID', userIdMD5)

    // stage A. today pose list
    const generateTodayPoseList = (nPose: number): number[] => {
        // extracting available pose id from poseInfo
        const poseData: YogaPoseAPI[] = poseInfo
        const poseIDList = poseData.map((item) => item?.id)

        // picking random n pose from the poseIDList
        const shuffled = poseIDList.sort(() => 0.5 - Math.random())

        // check overflow condition
        nPose = shuffled.length >= nPose ? nPose : shuffled.length

        // return the final list of pose id
        const randomPoseIDList = shuffled.slice(0, nPose)
        return randomPoseIDList
    }

    // stage B. user active days
    const generateUserActiveDays = (): number[] => {
        const epochTimeList = data
        const epochTimeExtracted = epochTimeList?.map(
            (time) => time?.startTime
        ) as number[]

        console.log(epochTimeExtracted)

        return epochTimeExtracted
    }

    // stage C. user recent activity
    const generateUserRecentActivity = (nActivity: number): number[] => {
        // extracting available start time as epoch time from data
        const userActivity = data as DBFetchSupabase[]
        const userActivityEpochList = userActivity.map((item) => item?.poseID)

        // check overflow condition
        nActivity =
            userActivityEpochList.length >= nActivity
                ? nActivity
                : userActivityEpochList.length

        // return the final list of pose id according to sorted epoch time
        const recentActivity = userActivityEpochList.slice(0, nActivity)

        return recentActivity
    }

    // stage D. last n days activity
    const generateLastNDaysActivity = (nDays: number) => {
        const today = new Date()
        const thirtyDaysAgo = new Date(
            today.getTime() - 30 * 24 * 60 * 60 * 1000
        )

        nDays = Math.min(365, nDays)
        const timestamp = generateUserActiveDays()
        // Convert timestamps to dates within the last 30 days
        const activityDays = timestamp
            .map((ts) => new Date(ts * 1000))
            .filter((date) => date >= thirtyDaysAgo && date <= today)
            .map((date) => date.toISOString().split('T')[0])

        // Count the frequency of activity per day
        const frequency: Record<string, number> = {}
        activityDays.forEach((day) => {
            frequency[day] = (frequency[day] || 0) + 1
        })

        // Create the representation for the last 30 days
        const representation = new Array(30).fill(0)

        for (let i = 0; i < 30; i++) {
            const day = new Date(today.getTime() - i * 24 * 60 * 60 * 1000)
            const dayString = day.toISOString().split('T')[0]
            if (frequency[dayString]) {
                representation[29 - i] = frequency[dayString]
            }
        }

        return representation
    }

    const responseData: { [key: string]: any } = {
        todayPoseList: generateTodayPoseList(3),
        userActiveDays: generateUserActiveDays(),
        userRecentActivity: generateUserRecentActivity(5),
        userLastNDaysActivity: generateLastNDaysActivity(30),
    }

    // stage - 4 (optional) handle error
    if (error) {
        console.log(error)

        return NextResponse.json(
            {
                message: 'error in fetching data from database',
            },
            {
                status: 400,
            }
        )
    }

    // stage - 4 sending data to client
    return NextResponse.json(
        {
            responseData,
        },
        {
            status: 200,
        }
    )
}
