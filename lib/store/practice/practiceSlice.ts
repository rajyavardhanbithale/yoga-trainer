import {
    APIYogaPosePerformanceData,
    UserPoseAnalysis,
    YogaPoseDetailed,
    YogaPosePerformanceData,
} from '@/types'
import { createClientBrowser } from '@/utils/supabase/client'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import CryptoJS from 'crypto-js'
import { User } from "lucide-react"

export interface TutorialSource {
    source?: string | null
    provider: 'video' | 'animated' | null
}

type STATE = {
    poseData: YogaPoseDetailed | null
    tutorialSource: TutorialSource | null
    currentTab: 'benefits' | 'tutorial' | 'accuracy' | 'analysis' | 'audio'
    audioState: 'benefits' | null
    analysis: UserPoseAnalysis
    updateStatus: 'idle' | 'pending' | 'success' | 'error'
}

const initialState: STATE = {
    tutorialSource: null,
    poseData: null,
    currentTab: 'benefits',
    audioState: null,
    analysis: {
        poseID: 0,
        poseName: '',
        startTime: 0,
        endTime: 0,
        accuracy: [],
        correctPose: [],
        repTime: 0,
    },
    updateStatus: 'idle',
}

type UpdatePosePayload = {
    method: string
    data?: UserPoseAnalysis
}

const supabase = createClientBrowser()

export const practiceSliceUpdateDB = createAsyncThunk<UpdatePosePayload, UpdatePosePayload>(
    'tensorflow/updateDB',
    async ({ method, data }) => {
        const {
            data: { user },
            error,
        } = await supabase.auth.getUser()

        const userID: string | null = user ? CryptoJS.MD5(user.id).toString() : null
    
        if (method === 'update-db' && userID) {
            if (data  && data.accuracy.length !== 0) {
            const payload: APIYogaPosePerformanceData = {
                userID: userID,
                poseID: data?.poseID,
                startTime: Math.floor(data?.startTime / 1000),
                endTime: Math.floor(data?.endTime / 1000),
                repTime: data?.repTime,
                accuracy: data?.accuracy,
                correctPose: data?.correctPose,
            }

            const response = await axios.post('/api/db/insert', payload)
            // const response1 = await axios.get('/api/unlock-achievement')
        }
        }
        return { method, data }
    }
)

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
                'benefits' | 'tutorial' | 'accuracy' | 'analysis' | 'audio'
            >
        ) => {
            state.currentTab = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(practiceSliceUpdateDB.pending, (state) => {
            state.updateStatus = 'pending'
        })
        builder.addCase(practiceSliceUpdateDB.fulfilled, (state, action) => {
            state.updateStatus = 'success'
            if (action.payload.data) {
                state.analysis = action.payload.data

            } else {
                console.error('undefined data from the API')
            }
        })
        builder.addCase(practiceSliceUpdateDB.rejected, (state) => {
            state.updateStatus = 'error'
        })
    }
})

export const { setTutorial, setPoseData, changeTab } = practiceSlice.actions
export default practiceSlice.reducer
