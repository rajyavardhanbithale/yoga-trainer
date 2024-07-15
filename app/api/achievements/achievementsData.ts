export interface achievementsData {
    id: number
    name: string
    description: string
    rarity: string
    level: string
    icon:string
}

export const AchievementsData: achievementsData[] = [
    {
        id: 301,
        name: "Beginner's Luck",
        description: "Complete your first yoga session",
        rarity: "Common",
        level: "beginner",
        icon:"beg-1"
    },
    {
        id: 302,
        name: "Stretch Starter",
        description: "Perform 3 different yoga poses",
        rarity: "Common",
        level: "beginner",
        icon:"beg-4"
    },
    {
        id: 303,
        name: "Early Bird",
        description: "Complete a yoga session before 7 AM",
        rarity: "Common",
        level: "beginner",
        icon:"beg-2"
    },
    {
        id:304,
        name: "Daily Practitioner",
        description: "Complete yoga sessions for 5 consecutive days",
        rarity: "Common",
        level: "beginner",
        icon:"beg-3"
    },
    {
        id:305,
        name: "Pose Explorer",
        description: "Master 6 different yoga poses",
        rarity: "Uncommon",
        level: "intermediate",
        icon:"int-3"
    },
    {
        id:306,
        name: "Balanced Mind",
        description: "Hold each pose for at least 30 seconds",
        rarity: "Uncommon",
        level: "intermediate",
        icon:"int-2"
    },
    {
        id:307,
        name: "Consistency Champ",
        description: "Complete yoga sessions for 15 consecutive days",
        rarity: "Uncommon",
        level: "intermediate",
        icon:"int-1"
    },
    {
        id:307,
        name: "Accuracy Ace",
        description: "Achieve 90% accuracy in a yoga session",
        rarity: "Rare",
        level: "intermediate",
        icon:"int-4"
    },
    {
        id:308,
        name: "Pose Prodigy",
        description: "Master all 12 yoga poses",
        rarity: "Rare",
        level: "intermediate",
        icon:"int-5"
    },
    {
        id:309,
        name: "Yogi Master",
        description: "Complete 50 yoga sessions",
        rarity: "Epic",
        level: "advanced",
        icon:"adv-1"
    },
    {
        id:310,
        name: "Zen Master",
        description: "Achieve 100% accuracy in a yoga session",
        rarity: "Legendary",
        level: "advanced",
        icon:"adv-2"
    }
]

