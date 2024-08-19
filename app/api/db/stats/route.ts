import { NextRequest, NextResponse } from 'next/server'
import CryptoJS from 'crypto-js'
import { createClient } from '@/utils/supabase/server'

const poseAnalysis = process.env.NEXT_PUBLIC_SUPABASE_DATABASE_POSE_ANALYSIS!
const authCookieKey = process.env.NEXT_AUTH_COOKIE_KEY!
const aesSalt = process.env.NEXT_PUBLIC_AES_SALT!

async function getUserIDCookie(cookie: string | undefined) {
    try {
        if (cookie !== undefined) {
            const aesEncrypted = CryptoJS.AES.decrypt(cookie, aesSalt).toString(
                CryptoJS.enc.Utf8
            )

            return aesEncrypted
        } else {
            return NextResponse.json(
                { message: 'error in fetching data from database' },
                { status: 400 }
            )
        }
    } catch {
        return NextResponse.json(
            { message: 'error in fetching data from database' },
            { status: 400 }
        )
    }
}

export async function GET(request: NextRequest) {
    const cookie = request.cookies.get(authCookieKey)

    const supabase = createClient()

    // stage 1 - extract user ID information
    const userIdMD5 = await getUserIDCookie(cookie?.value)

    // stage 2 - query from database
    const { data, error } = await supabase
        .from(poseAnalysis)
        .select('poseID, correctPose, startTime, userID')
        .eq('userID', userIdMD5)

    // stage A. weekly activity
    const generateUserActiveDays = (): number[] => {
        const epochTimeList = data
        const epochTimeExtracted = epochTimeList?.map(
            (time) => time?.startTime
        ) as number[]

        return epochTimeExtracted
    }

    const userActivity = (nDays: number) => {
        const epochTime = generateUserActiveDays()

        nDays = Math.min(365, nDays)

        const today = new Date()
        const dayOfWeek = today.getDay()

        // Calculate the most recent Monday
        const daysToMonday = (dayOfWeek + 6) % 7
        const mondayDate = new Date(today)
        mondayDate.setDate(today.getDate() - daysToMonday)
        mondayDate.setHours(0, 0, 0, 0)

        // Convert epoch times to dates and filter them to be within the current week
        const activityDays = epochTime
            .map((ts) => new Date(ts * 1000))
            .filter((date) => date >= mondayDate && date <= today)
            .map((date) => date.getDay())

        // Calculate activity frequency for each day of the week
        const frequency: number[] = new Array(7).fill(0)
        activityDays.forEach((day) => {
            frequency[day]++
        })

        // Adjust the order of days to match the start of the week from Monday
        const representation = new Array(7).fill(0)
        for (let i = 0; i < 7; i++) {
            const dayIndex = (i + 1) % 7
            representation[i] = frequency[dayIndex]
        }

        return representation
    }

    const userActiveInMonth = (nDays: number) => {
        const now = new Date();
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(now.getDate() - nDays);

        const activity = generateUserActiveDays();

       
        const activeDates = activity
            .map((timestamp) => new Date(timestamp * 1000)) 
            .filter(date => date >= thirtyDaysAgo && date <= now) 
            .map(date => date.toISOString().split('T')[0]) 
            .reduce((uniqueDates, date) => {
                uniqueDates.add(date);
                return uniqueDates;
            }, new Set<string>());

        return {
            inactive: nDays - activeDates.size, 
            active: activeDates.size
        };
    }

    const userAccuracyInaccuracy = (nDays: number) => {
        const correctPoseList: number[][] | undefined = data
            ?.map((item) => item.correctPose)
            .slice(0, nDays)

        const correctPosePercentage =
            correctPoseList &&
            correctPoseList.map((item) => {
                const sum = item.reduce((a, b) => a + b, 0)
                return Math.round((sum / item.length) * 100)
            })

        const accuracy = correctPosePercentage
        const inaccuracy = correctPosePercentage?.map((acc) => 100 - acc)

        const averageAccuracy =
            accuracy && accuracy?.reduce((a, b) => a + b, 0) / accuracy.length
        const averageInaccuracy = averageAccuracy && 100 - averageAccuracy

        return {
            accuracy: accuracy,
            inaccuracy: inaccuracy,
            average: {
                accuracy: averageAccuracy,
                inaccuracy: averageInaccuracy,
            },
        }
    }

    //
    const getIndices = (id: number) => {
        const poseList = data && data?.map((item) => item?.poseID)
        const correctPoseList: number[][] | undefined = data?.map(
            (item) => item.correctPose
        )
        const correctPosePercentage =
            correctPoseList &&
            correctPoseList.map((item) => {
                const sum = item.reduce((a, b) => a + b, 0)
                return Math.round((sum / item.length) * 100)
            })

        const specificPoseID = id
        const indices: number[] = []
        poseList &&
            correctPosePercentage &&
            poseList.forEach((poseID, index) => {
                if (poseID === specificPoseID) {
                    indices.push(correctPosePercentage[index])
                }
            })

        return indices
    }

    const userAreaOfInterest = () => {
        const poseList = data && data?.map((item) => item?.poseID)
        const poseSet = new Set(poseList)

        const cnt: { [key: string]: number } = {}
        poseList &&
            poseList.forEach((item) => {
                if (poseSet.has(item)) {
                    cnt[item] = (cnt[item] || 0) + 1
                }
            })
        const sortedCounts = Object.entries(cnt).sort((a, b) => b[1] - a[1])

        return sortedCounts.map(([key, count]) => {
            return { id: key, count: count, data: getIndices(parseInt(key)) }
        })
    }

    const responseData: { [key: string]: any } = {
        weeklyActivity: userActivity(7),
        activeInMonth: userActiveInMonth(30),
        performance: userAccuracyInaccuracy(30),
        areaOfInterest: userAreaOfInterest(),
    }

    // stage - 4 (optional) handle error
    if (error) {

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
