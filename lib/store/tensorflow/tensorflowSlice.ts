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
    repTime: number
    poseMessage: string

    isModelLoaded: boolean
    isModelRunning: boolean
    isUserPoseCorred: boolean | null
}

const initialState: STATE = {
    repTime: 3,
    poseMessage: 'Get ready!',
    isModelLoaded: false,
    isModelRunning: false,

    isUserPoseCorred: null,
}

export const tensorflow = createSlice({
    name: 'tensorflow',
    initialState,
    reducers: {
        updateRepTime: (state, action) => {
            state.repTime = action.payload
        },
        updateModelLoaded: (state, action) => {
            state.isModelLoaded = action.payload
        },
        updateModelRunning: (state, action) => {
            state.isModelRunning = action.payload
        },
    },
})

export const { updateRepTime, updateModelLoaded, updateModelRunning } =
    tensorflow.actions
export default tensorflow.reducer
