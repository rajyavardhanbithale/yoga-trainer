import { achievementCriteria } from './achievementCriteria'
import { createClient } from '@/utils/supabase/server'

const USERDB = process.env.NEXT_PUBLIC_SUPABASE_DATABASE_USER_PROFILE!
export async function unlockAchievements(
    totalPoseCount: number,
    uniquePoseCount: number,
    accuracy: number,
    isEarlyBird: boolean,
    streak5: boolean,
    streak15: boolean,
    userID: string | undefined
) {
    const unlockedAchievements: number[] = []

    const supabase = createClient()

    for (const criteria of achievementCriteria) {
        if (
            (criteria.totalPoseCount === undefined ||
                totalPoseCount >= criteria.totalPoseCount) &&
            (criteria.uniquePoseCount === undefined ||
                uniquePoseCount >= criteria.uniquePoseCount) &&
            (criteria.accuracy === undefined ||
                accuracy >= criteria.accuracy) &&
            (criteria.isEarlyBird === undefined ||
                isEarlyBird === criteria.isEarlyBird) &&
            (criteria.streakDays === undefined ||
                (criteria.streakDays === 5 && streak5) ||
                (criteria.streakDays === 15 && streak15))
        ) {
            unlockedAchievements.push(criteria.id)
        }
    }

    // fetching previous achievements
    const { data: previous, error } = await supabase
        .from(USERDB)
        .select('achievements')
        .eq('userID', userID)
        .single()

    const prevAchievements = previous?.achievements

    if (unlockedAchievements.length > 0) {
        const updatedAchievements = unlockedAchievements
        await supabase
            .from(USERDB)
            .update({ achievements: updatedAchievements })
            .eq('userID', userID)
    }

    const newAchievements = prevAchievements
        ? unlockedAchievements?.filter((ach: number) => {
              !prevAchievements.includes(ach)
          })
        : unlockedAchievements

    return newAchievements
}
