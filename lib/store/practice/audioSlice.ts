import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AudioData {
    audioID: number
    audioName: string
    mainAudio: string
    benefits: string
    narratorSegment: string[]
}

type STATE = {
    audioData: AudioData | null
    audioState: 'narrator' | 'benefits' | 'tips' | 'ambient' | null
    audioSpeed: 'slower' | 'slow' | 'fine' | 'fast' | 'faster'
    ambientMusic: boolean
    ambientMusicName: string | null
    volume: number
}

const initialState: STATE = {
    audioData: null,
    audioState: null,
    audioSpeed: 'fine',
    ambientMusic: false,
    ambientMusicName: null,
    volume: 50,
}

const audioSlice = createSlice({
    name: 'audioSlice',
    initialState,
    reducers: {
        setAudioData: (state, action: PayloadAction<AudioData>) => {
            state.audioData = action.payload
        },
        setAudioState: (
            state,
            action: PayloadAction<'narrator' | 'benefits' | 'tips' | null>
        ) => {
            state.audioState = action.payload
        },
        setAudioSpeed: (
            state,
            action: PayloadAction<
                'slower' | 'slow' | 'fine' | 'fast' | 'faster'
            >
        ) => {
            state.audioSpeed = action.payload
        },
        setAmbientMusic: (state) => {
            state.ambientMusic = !state.ambientMusic
            state.audioState = 'ambient'
        },
        setAmbientMusicName: (state, action: PayloadAction<string>) => {
            state.ambientMusicName = action.payload
        },
        setVolume: (state, action: PayloadAction<number>) => {
            state.volume = action.payload
        },
    },
})

export const {
    setAudioData,
    setAudioState,
    setAudioSpeed,
    setAmbientMusic,
    setAmbientMusicName,
    setVolume,
} = audioSlice.actions
export default audioSlice.reducer
