import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import CryptoJS from 'crypto-js'
import { unlockAchievements } from './checkCriteria'

const USERDB = process.env.NEXT_PUBLIC_SUPABASE_DATABASE_USER_PROFILE!

export async function GET(req: NextRequest, res: NextResponse) {
    const supabase = createClient()

    const userInfo = await supabase.auth.getUser()
    const userID = userInfo?.data?.user?.id

    const userIdMD5 = userID && CryptoJS.MD5(userID).toString()

    if (userIdMD5 === undefined) {
        return NextResponse.json(
            { error: 'User ID not found' },
            { status: 404 }
        )
    }

    const { data, error } = await supabase
        .from('pose-performance-data')
        .select('poseID,accuracy,correctPose,startTime')
        .eq('userID', userIdMD5)

    // calculating accuracy
    const calculateAccuracy = () => {
        const filterArray: number[][] = data?.map((item) => item.accuracy) ?? []
        const sumArray: number = filterArray?.flat()?.reduce((a, b) => {
            return a + b
        }, 0)
        const accuracy: number =
            Math.floor((sumArray / filterArray?.flat()?.length) * 100 * 100) /
            100
        return accuracy
    }

    //  get user poses
    const userPose = () => {
        const filterArray: number[] = data?.map((item) => item.poseID) ?? []

        const poseCount = filterArray.length
        const uniquePose = Array.from(new Set(filterArray))

        const userPose = {
            totalPoseCount: poseCount,
            totalPose: filterArray,

            uniquePoseCount: uniquePose.length,
            uniquePose: uniquePose,
        }
        return userPose
    }

    // check if user is early bird
    const checkTime = () => {
        function getHoursFromEpoch(epochTime: number): string {
            const date = new Date(epochTime * 1000)
            return date.getHours().toString().padStart(2, '0')
        }

        const filterArray: number[] = data?.map((item) => item.startTime) ?? []
        const timeArray = filterArray.map(getHoursFromEpoch)

        const checkTime = timeArray.map((time) => {
            if (4 < parseInt(time) && parseInt(time) > 7) {
                return true
            }
        })

        return true
    }

    // check streak
    const userActivity = (nDays: number) => {
        const generateUserActiveDays = (): number[] => {
            const epochTimeList = data
            const epochTimeExtracted = epochTimeList?.map(
                (time) => time?.startTime
            ) as number[]

            return epochTimeExtracted
        }
        const epochTime = generateUserActiveDays()

        nDays = Math.min(365, nDays)

        const today = new Date()
        const dayOfWeek = today.getDay()
        const daysToMonday = (dayOfWeek + 6) % 7

        const mondayDate = new Date(today)
        mondayDate.setDate(today.getDate() - daysToMonday)
        mondayDate.setHours(0, 0, 0, 0)

        const activityDays = epochTime
            .map((ts) => new Date(ts * 1000))
            .filter((date) => date >= mondayDate && date <= today)
            .map((date) => date.getDay())

        const frequency: number[] = new Array(7).fill(0)
        activityDays.forEach((day) => {
            frequency[day]++
        })

        const representation = new Array(7).fill(0)
        for (let i = 0; i < 7; i++) {
            const day = (dayOfWeek - i + 7) % 7
            if (frequency[day] > 0) {
                representation[i] = frequency[day]
            }
        }

        return representation.includes(0) ? false : true
    }

    const { totalPoseCount, totalPose, uniquePoseCount, uniquePose } =
        userPose()
    const accuracy = calculateAccuracy()
    const isUserEarlyBird = checkTime()
    const streak5 = userActivity(5)
    const streak15 = userActivity(15)

    const achievementUnlocked = await unlockAchievements(
        totalPoseCount,
        uniquePoseCount,
        accuracy,
        isUserEarlyBird,
        streak5,
        streak15,
        userIdMD5
    )

    return NextResponse.json(achievementUnlocked)
}
