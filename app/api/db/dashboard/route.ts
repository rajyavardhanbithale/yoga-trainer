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
    const generateLastNDaysActivity = (nDays: number): number[] => {
        const epochTime = generateUserActiveDays()

        // Ensure we're dealing with exactly nDays
        nDays = Math.min(365, nDays)

        // Get the current time in epoch seconds
        const now = Math.floor(Date.now() / 1000)

        // Calculate the start time of the range (30 days ago)
        const startTime = now - nDays * 24 * 60 * 60

        // Filter activities that fall within the last nDays
        const filteredEpochTime = epochTime.filter((time) => time >= startTime)

        // Collect the unique days in the last nDays range
        const daySet = new Set<number>()
        filteredEpochTime.forEach((time) => {
            const day = Math.floor(time / (24 * 60 * 60))
            daySet.add(day)
        })

        // Convert Set to Array and sort in descending order
        const activeDays = Array.from(daySet).sort((a, b) => b - a)

        // Initialize result array with zeroes
        const activityCounts = Array(nDays).fill(0)

        // Fill in the activity counts
        activeDays.slice(0, nDays).forEach((day) => {
            const index = Math.min(nDays - 1, activeDays.indexOf(day))
            if (index >= 0) {
                activityCounts[index] = filteredEpochTime.filter(
                    (time) => Math.floor(time / (24 * 60 * 60)) === day
                ).length
            }
        })

        return activityCounts.reverse()
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
