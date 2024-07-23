import { configureStore } from '@reduxjs/toolkit'
import dashboardSlice from './dashboard/dashboardSlice'
import userProfileSlice from './dashboard/userProfileSlice'
import profileSlice from './user/profileSlice'
import dietSlice from './dashboard/dietSlice'

export const store = configureStore({
    reducer: {
        dashboard: dashboardSlice,
        userProfile: userProfileSlice,
        profileSlice: profileSlice,
        dietSlice: dietSlice,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
