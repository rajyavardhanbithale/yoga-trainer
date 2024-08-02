import { configureStore } from '@reduxjs/toolkit'
import dashboardSlice from './dashboard/dashboardSlice'
import userProfileSlice from './dashboard/userProfileSlice'
import profileSlice from './user/profileSlice'
import dietSlice from './dashboard/dietSlice'
import practiceSlice from './practice/practiceSlice'
import audioSlice from './practice/audioSlice'
import tensorflowSlice from './tensorflow/tersorflowSlice'

export const store = configureStore({
    reducer: {
        dashboard: dashboardSlice,
        userProfile: userProfileSlice,
        profileSlice: profileSlice,
        dietSlice: dietSlice,
        practiceSlice: practiceSlice,
        audioSlice: audioSlice,
        tensorflowSlice: tensorflowSlice,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
