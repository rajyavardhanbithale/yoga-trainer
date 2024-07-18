import { configureStore } from '@reduxjs/toolkit'
import dashboardSlice from "./dashboard/dashboardSlice"
import userProfileSlice from "./dashboard/userProfileSlice"


export const store = configureStore({
  reducer: {
    dashboard: dashboardSlice,
    userProfile: userProfileSlice,
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch