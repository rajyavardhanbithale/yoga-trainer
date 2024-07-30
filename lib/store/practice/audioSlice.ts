import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type STATE = {
    audioState: 'narrator' | 'benefits' | 'tips' | null
}

const initialState: STATE = {
    audioState: null,
}

const audioSlice = createSlice({
    name: 'audioSlice',
    initialState,
    reducers: {
        setAudioState: (state, action: PayloadAction<'narrator' | 'benefits' | 'tips' | null>) => {
            state.audioState = action.payload
        },
    },
})


export const { setAudioState } = audioSlice.actions
export default audioSlice.reducer