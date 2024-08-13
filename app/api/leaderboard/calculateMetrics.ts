import { UserMetrics } from "@/types"

interface data {
    userID: string
    correctPose: number[]
    accuracy: number[]
    startTime: number
    endTime: number
    repTime: number
    duration: number
}

export function CalculateMetrics(data: data[]) {
    const mean = (arr: number[]): number =>
        arr.reduce((a, b) => a + b, 0) / arr.length

    const standardDeviation = (arr: number[]): number => {
        const avg = mean(arr)
        return Math.sqrt(
            arr.reduce((sq, n) => sq + Math.pow(n - avg, 2), 0) / arr.length
        )
    }

    const userData: Record<string, UserMetrics> = {}

    data.forEach((entry) => {
        const userId = entry.userID
        if (!userData[userId]) {
            userData[userId] = {
                correctPose: [],
                repTime: [],
                totalReps: 0,
                duration: [],
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
    })



    const userMetricsArray = Object.keys(userData).map((userId) => {
        const metrics = userData[userId]

        return {
            id: userId,
            correctPoseMean: mean(metrics.correctPose),
            correctPoseStdDev: standardDeviation(metrics.correctPose),
            repTimeMean: mean(metrics.repTime),
            repTimeStdDev: standardDeviation(metrics.repTime),
            durationMean: mean(metrics.duration),
            durationStdDev: standardDeviation(metrics.duration),
        }
    })


    return userMetricsArray
}