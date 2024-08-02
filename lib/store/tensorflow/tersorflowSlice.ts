import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const successMessageList: Array<string> = [
    'Correct pose!',
    'Nailed it!',
    'Great form!',
    'Well done',
    'You got it!',
]
const unsuccessMessageList: Array<string> = [
    'Incorrect pose.',
    'Try once more.',
    'Keep practicing.',
    'Check your posture.',
    'Try another angle.',
]

type STATE = {
    loading: boolean
    isPoseValid: boolean | null
    isModelAvailable: boolean
    isModelRunning: boolean
    poseMessage: string | null
}

const initialState: STATE = {
    loading: false,
    isPoseValid: null,
    isModelAvailable: false,
    isModelRunning: false,
    poseMessage: null
}

export const tensorflowSlice = createSlice({
    name: 'tensorflowSlice',
    initialState,
    reducers: {
        setModelLoading: (state, action) => {
            state.loading = action.payload
        },
        updateBoolPose: (state, action: PayloadAction<boolean>) => {
            state.isPoseValid = action.payload
            if (action.payload === true) {
                state.poseMessage = successMessageList[
                    Math.floor(Math.random() * successMessageList.length)
                ]
            } else {
                state.poseMessage = unsuccessMessageList[
                    Math.floor(Math.random() * unsuccessMessageList.length)
                ]
            }
        },
        isModelAvailable: (state, action: PayloadAction<boolean>) => {
            state.isModelAvailable = action.payload
        },
        updateModelRunning: (state, action: PayloadAction<boolean>) => {
            state.isModelRunning = action.payload
        },
    },
})

export const {
    setModelLoading,
    updateBoolPose,
    isModelAvailable,
    updateModelRunning
} = tensorflowSlice.actions
export default tensorflowSlice.reducer
