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
    repTime:number
}

const initialState: STATE = {
    loading: false,
    isPoseValid: null,
    isModelAvailable: false,
    isModelRunning: false,
    poseMessage: null,
    repTime:3
}



export const tensorflow = createSlice({
    name: 'tensorflow',
    initialState,
    reducers: {
        setModelLoading: (state, action) => {
            state.loading = action.payload
        },
        updateBoolPose: (state, action: PayloadAction<boolean>) => {
            state.isPoseValid = action.payload
            if (action.payload === true) {
                state.poseMessage =
                    successMessageList[
                        Math.floor(Math.random() * successMessageList.length)
                    ]
            } else {
                state.poseMessage =
                    unsuccessMessageList[
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
        updateRepTime: (state, action: PayloadAction<number>) => {
            localStorage.setItem('repTime', action.payload.toString()); 

            console.log(action.payload);
            
            state.repTime = action.payload
        }
    },
})

export const {
    setModelLoading,
    updateBoolPose,
    isModelAvailable,
    updateModelRunning,
    updateRepTime
} = tensorflow.actions
export default tensorflow.reducer
