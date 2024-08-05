interface AchievementCriteria {
    id: number
    totalPoseCount?: number
    uniquePoseCount?: number
    accuracy?: number
    isEarlyBird?: boolean
    streakDays?: number
}

export const achievementCriteria: AchievementCriteria[] = [
    { id: 301, totalPoseCount: 1 }, // Beginner's Luck
    { id: 302, uniquePoseCount: 3 }, // Stretch Starter
    { id: 303, isEarlyBird: true }, // Early Bird
    { id: 304, streakDays: 5 }, // Daily Practitioner
    { id: 305, uniquePoseCount: 6 }, // Pose Explorer
    // { id: 306, accuracy: 30 },        // Balanced Mind (assuming accuracy is related)
    { id: 307, streakDays: 15 }, // Consistency Champ
    { id: 308, accuracy: 90, totalPoseCount: 30 }, // Accuracy Ace
    { id: 309, totalPoseCount: 50 }, // Yogi Master
    // { id: 310, accuracy: 100 }        // Zen Master
]
