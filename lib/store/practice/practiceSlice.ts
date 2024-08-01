import { YogaPoseDetailed, YogaPosePerformanceData } from '@/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface TutorialSource {
    source?: string | null
    provider: 'video' | 'animated' | null
}

type STATE = {
    poseData: YogaPoseDetailed | null
    tutorialSource: TutorialSource | null
    currentTab: 'benefits' | 'tutorial' | 'accuracy' | 'analysis' | 'audio'
    audioState: 'benefits' | null
    analysis: YogaPosePerformanceData
}

const initialState: STATE = {
    tutorialSource: null,
    poseData: null,
    currentTab: 'audio',
    audioState: null,
    analysis: {
        accuracy: [0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1],
        startTime: 1722340140000,
        endTime: 1722340380000,
        correctPose: [0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1],
        poseID: 101,
        poseName: 'Tree Pose',
        repTime: 5,
    },
}

export const practiceSlice = createSlice({
    name: 'practiceSlice',
    initialState,
    reducers: {
        setTutorial: (state, action: PayloadAction<TutorialSource | null>) => {
            state.tutorialSource = action.payload
            if (state.tutorialSource && action.payload?.provider === 'video') {
                state.tutorialSource.source =
                    state.poseData?.videoData?.tutorialIFRAME
            }
            if (
                state.tutorialSource &&
                action.payload?.provider === 'animated'
            ) {
                state.tutorialSource.source = state.poseData?.tutorial
            }
        },
        setPoseData: (state, action: PayloadAction<YogaPoseDetailed>) => {
            state.poseData = action.payload
            if (action.payload.tutorial) {
                state.tutorialSource = {
                    source: action.payload.tutorial,
                    provider: 'animated',
                }
            }
        },
        changeTab: (
            state,
            action: PayloadAction<
                'benefits' | 'tutorial' | 'accuracy' | 'analysis' | 'audio' | string
            >
        ) => {
            state.currentTab = action.payload
        },
    },
})

export const { setTutorial, setPoseData, changeTab } = practiceSlice.actions
export default practiceSlice.reducer
