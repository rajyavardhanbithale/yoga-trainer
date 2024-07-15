import { APIYogaDataMinimal, IFResponse1 } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios'

type STATE = {
    data: IFResponse1 | null
    POSEDATA: APIYogaDataMinimal[] | null
    RECENTACT: APIYogaDataMinimal[] | null
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState: STATE = {
    data: null,
    POSEDATA:null,
    RECENTACT:null,
    loading: 'idle',
}

export const fetchDashboardAPI = createAsyncThunk(
    'api/dashboard',
    async () => {
        const response = await axios.get('/api/db/dashboard')
        return response.data.responseData as IFResponse1
    }
)

export const fetchYogaPoseAPI = createAsyncThunk(
    'api/pose',
    async (param:string) => {
        const response = await axios.get(`/api/pose?poseID=${param}`)
        return response.data.poseDataList as APIYogaDataMinimal[]
    }
)

export const fetchRecentActivity = createAsyncThunk(
    'api/recent-activity',
    async (param:string) => {
        const response = await axios.get(`/api/pose?poseID=${param}`)
        return response.data.poseDataList as APIYogaDataMinimal[]
    }
)


const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchDashboardAPI.fulfilled, (state, action: PayloadAction<IFResponse1>) => {
            state.data = action.payload;
            state.loading = 'succeeded';
        });
        builder.addCase(fetchDashboardAPI.pending, (state) => {
            state.loading = 'pending';
        });
        builder.addCase(fetchDashboardAPI.rejected, (state) => {
            state.loading = 'failed';
        });

        builder.addCase(fetchYogaPoseAPI.fulfilled, (state,action: PayloadAction<APIYogaDataMinimal[]>) => {
            state.POSEDATA = action.payload;
            state.loading = 'succeeded';
        })
        builder.addCase(fetchRecentActivity.fulfilled, (state,action: PayloadAction<APIYogaDataMinimal[]>) => {
            state.RECENTACT = action.payload;
            state.loading = 'succeeded';
        })
    },
});

export default dashboardSlice.reducer