interface YogaPose {
    id: number
    name: string
    originalName: string
    image: string
}

interface YogaPoseDetailed {
    id: number
    name: string
    originalName: string
    description: string
    benefits: Array<string>
    tutorial: string
    image: string
    TFData: {
        class: string
        set: number
    }
    audioData: {
        mainAudio: string
        benefits: string
        narratorSegment: Array<string>
    }
    videoData: {
        tutorialURL: string
        tutorialIFRAME: string
        tutorialSource: string
    }

}


interface YogaPoseAPI {
    id: number
    name: string
    originalName: string
    description: string
    benefits: Array<string>
    tutorial: string
    image: string
    TFData: {
        class: string
        set: number
    }
    audioData: {
        mainAudio: string
        benefits: string
        narratorSegment: Array<string>
    }
    videoData: {
        tutorialURL: string
        tutorialIFRAME: string
        tutorialSource: string
    }
}

interface AmbientMusic {
    id: number
    name: string
    file: string
    keyword: Array<string>
}

interface PoseMessage {
    isSuccess: Boolean
    poseMessage: string | undefined
}

interface AudioState {
    status: Boolean
    state: string
    playbackSpeed: string
}

interface UserSectionSelection {
    active: string
}

interface YogaPosePerformanceData {
    poseID: number
    poseName: string
    startTime: number
    repTime: number
    endTime: number
    accuracy: Array<number>
    correctPose: Array<number>
}

interface LogIn {
    email: string
    password: string
}

interface SignUp {
    email: string
    password: string
    confirmPassword: string
}

interface APIYogaPosePerformanceData {
    userID: string
    poseID: number
    startTime: number
    repTime: number
    endTime: number
    accuracy: Array<number>
    correctPose: Array<number>
}

interface APIYogaDataMinimal {
    id: number
    name: string
    originalName: string
    image: string
}

interface DashboardPROPS {
    name: string
    todayPoseList: APIYogaDataMinimal[]
    userActiveDays: Array<number>
    userRecentActivity: APIYogaDataMinimal[]
    userLastNDaysActivity: Array<number>
}

interface DBFetchSupabase {
    poseID: number
    startTime: number
    correctPose: Array<number>
}

interface DashboardStats{
    weeklyActivity: Array<number>
    activeInMonth: {[key:string]:number}
    performance: {[key:string]:number}
    areaOfInterest: any
}
interface IFResponse1 {
    todayPoseList: number[]
    userActiveDays: any
    userRecentActivity: any
    userLastNDaysActivity: any
}

export type {
    YogaPose,
    YogaPoseAPI,
    YogaPoseDetailed,
    AmbientMusic,
    PoseMessage,
    AudioState,
    UserSectionSelection,
    YogaPosePerformanceData,


    APIYogaPosePerformanceData,
    APIYogaDataMinimal,

    LogIn,
    SignUp,


    DashboardPROPS,
    DashboardStats,

    DBFetchSupabase,

    IFResponse1
}