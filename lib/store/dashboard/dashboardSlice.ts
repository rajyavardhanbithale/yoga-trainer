import { achievementsData } from '@/app/api/achievements/achievementsData'
import { APIYogaDataMinimal, DashboardStats, IFResponse1 } from '@/types'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

type STATE = {
    data: IFResponse1 | null
    POSEDATA: APIYogaDataMinimal[] | null
    RECENTACT: APIYogaDataMinimal[] | null
    STATS: DashboardStats | null
    ACHIEVEMENTS: number[] | null
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
    activeWindow: string
}

const initialState: STATE = {
    data: null,
    POSEDATA: null,
    RECENTACT: null,
    STATS: null,
    ACHIEVEMENTS: null,
    loading: 'idle',
    activeWindow: 'dashboard',
}

export const fetchDashboardAPI = createAsyncThunk('api/dashboard', async () => {
    const response = await axios.get('/api/db/dashboard')
    return response.data.responseData as IFResponse1
})

export const fetchYogaPoseAPI = createAsyncThunk(
    'api/pose',
    async (param: string) => {
        const response = await axios.get(`/api/pose?poseID=${param}`)
        return response.data.poseDataList as APIYogaDataMinimal[]
    }
)

export const fetchRecentActivity = createAsyncThunk(
    'api/recent-activity',
    async (param: string) => {
        const response = await axios.get(`/api/pose?poseID=${param}`)
        return response.data.poseDataList as APIYogaDataMinimal[]
    }
)

export const fetchStats = createAsyncThunk('api/stats', async () => {
    const response = await axios.get(`/api/db/stats`)
    return response.data.responseData as DashboardStats
})

export const fetchAchievement = createAsyncThunk(
    'api/achievements',
    async () => {
        const response = await axios.get(`/api/achievements`)
        console.log(response)

        return response.data.achievements as number[]
    }
)

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        activeWindow: (state, action) => {
            state.activeWindow = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            fetchDashboardAPI.fulfilled,
            (state, action: PayloadAction<IFResponse1>) => {
                state.data = action.payload
                state.loading = 'succeeded'
            }
        )
        builder.addCase(
            fetchYogaPoseAPI.fulfilled,
            (state, action: PayloadAction<APIYogaDataMinimal[]>) => {
                state.POSEDATA = action.payload
                state.loading = 'succeeded'
            }
        )
        builder.addCase(
            fetchRecentActivity.fulfilled,
            (state, action: PayloadAction<APIYogaDataMinimal[]>) => {
                state.RECENTACT = Array.from(new Set(action.payload))
                state.loading = 'succeeded'
            }
        )
        builder.addCase(
            fetchStats.fulfilled,
            (state, action: PayloadAction<DashboardStats>) => {
                state.STATS = action.payload
            }
        )
        builder.addCase(
            fetchAchievement.fulfilled,
            (state, action: PayloadAction<number[]>) => {
                state.ACHIEVEMENTS = action.payload
            }
        )
    },
})

export const { activeWindow } = dashboardSlice.actions
export default dashboardSlice.reducer
