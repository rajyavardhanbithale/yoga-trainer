
import { achievementCriteria } from "./achievementCriteria";
import { createClient } from "@/utils/supabase/server";

export async function unlockAchievements(
    totalPoseCount: number,
    uniquePoseCount: number,
    accuracy: number,
    isEarlyBird: boolean,
    streak5: boolean,
    streak15: boolean,
    userID: string | undefined
) {
    const unlockedAchievements: number[] = [];

    const supabase = createClient()

    for (const criteria of achievementCriteria) {
        if (
            (criteria.totalPoseCount === undefined || totalPoseCount >= criteria.totalPoseCount) &&
            (criteria.uniquePoseCount === undefined || uniquePoseCount >= criteria.uniquePoseCount) &&
            (criteria.accuracy === undefined || accuracy >= criteria.accuracy) &&
            (criteria.isEarlyBird === undefined || isEarlyBird === criteria.isEarlyBird) &&
            (criteria.streakDays === undefined || (criteria.streakDays === 5 && streak5) || (criteria.streakDays === 15 && streak15))
        ) {
            unlockedAchievements.push(criteria.id);
        }
    }

    
    if (unlockedAchievements.length > 0) {
        const updatedAchievements = unlockedAchievements;
        await supabase
            .from('user-db')
            .update({ achievements: updatedAchievements })
            .eq('userID', userID);
    }

    return unlockedAchievements;
}
