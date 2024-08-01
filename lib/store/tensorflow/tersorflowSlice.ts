import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const successMessageList: Array<string> = ["Correct pose!", "Nailed it!", "Great form!", "Well done", "You got it!"]
const unsuccessMessageList: Array<string> = ["Incorrect pose.", "Try once more.", "Keep practicing.", "Check your posture.", "Try another angle."]


type STATE = {
    loading: boolean;
    successMessage: string | null
    unsuccessMessage: string | null

    isPoseValid: boolean | null
}

const initialState: STATE = {
    loading: false,
    successMessage: null,
    unsuccessMessage: null,
    isPoseValid: null
}

export const tensorflowSlice = createSlice({
    name: 'tensorflowSlice',
    initialState,
    reducers: {
        setModelLoading: (state, action) => {
            state.loading = action.payload
        },
        setSuccessMessage: (state) => {
            state.unsuccessMessage = null
            state.successMessage = successMessageList[Math.floor(Math.random() * successMessageList.length)]
        },
        setUnSuccessMessage: (state) => {
            state.successMessage = null
            state.unsuccessMessage = unsuccessMessageList[Math.floor(Math.random() * unsuccessMessageList.length)]
        },
        updateBoolPose: (state, action: PayloadAction<boolean>) => {
            state.isPoseValid = action.payload
        }
    }
})


export const { setModelLoading, setSuccessMessage, setUnSuccessMessage, updateBoolPose } = tensorflowSlice.actions
export default tensorflowSlice.reducer