

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
const userActivity = (nDays: number, epochTime: number[]) => {

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


export function CalculateMetrics(poseData: any): any {
    const mean = (arr: number[]): number =>
        arr.reduce((a, b) => a + b, 0) / arr.length

    const standardDeviation = (arr: number[]): number => {
        const avg = mean(arr)
        return Math.sqrt(
            arr.reduce((sq, n) => sq + Math.pow(n - avg, 2), 0) / arr.length
        )
    }

    const userData: Record<string, any> = {}

    poseData.forEach((entry:any) => {
        const userId = entry.userID
        if (!userData[userId]) {
            userData[userId] = {
                userInfo: entry['user-db'],
                correctPose: [],
                repTime: [],
                totalReps: 0,
                duration: [],
                epochTime: [],
                totalSessions: 0,
            }
        }
        userData[userId].correctPose.push(
            ...entry.correctPose.map((pose: number) => (pose === 1 ? 1 : 0))
        )
        userData[userId].repTime.push(
            ...Array(entry.correctPose.length).fill(entry.repTime)
        )
        userData[userId].totalReps += 1
        userData[userId].duration.push(entry.duration)
        userData[userId].epochTime.push(entry.startTime)
        userData[userId].totalSessions += 1
    })

    return Object.keys(userData).map((userId) => {
        const metrics = userData[userId]
        const weeklyActivity = userActivity(7, metrics.epochTime)

        return {
            id: userId,
            correctPoseMean: mean(metrics.correctPose),
            durationMean: mean(metrics.duration),
            weekActivity: weeklyActivity,
            totalSessions: metrics.totalSessions,
            userInfo: metrics.userInfo  
        }
    })

    // return {
        //     id: userId,
        //     correctPoseMean: mean(metrics.correctPose),
        //     correctPoseStdDev: standardDeviation(metrics.correctPose),
        //     repTimeMean: mean(metrics.repTime),
        //     repTimeStdDev: standardDeviation(metrics.repTime),
        //     durationMean: mean(metrics.duration),
        //     durationStdDev: standardDeviation(metrics.duration),
        //     weekActivity: weeklyActivity,
        //     userInfo: metrics.userInfo  
        // }
}
