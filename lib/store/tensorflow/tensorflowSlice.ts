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
    isUserPoseCorrect: boolean | null
}

const initialState: STATE = {
    repTime: 3,
    poseMessage: 'Get ready!',
    isModelLoaded: false,
    isModelRunning: false,

    isUserPoseCorrect: null,
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
        updateMessageList: (state, action) => {
            if (action.payload === 'success') {
                state.poseMessage =
                    successMessageList[
                        Math.floor(Math.random() * successMessageList.length)
                    ]
                state.isUserPoseCorrect = true
            } else {
                state.poseMessage =
                    unsuccessMessageList[
                        Math.floor(Math.random() * unsuccessMessageList.length)
                    ]
                state.isUserPoseCorrect = false
            }
        },
    },
})

export const {
    updateRepTime,
    updateModelLoaded,
    updateModelRunning,
    updateMessageList,
} = tensorflow.actions
export default tensorflow.reducer
