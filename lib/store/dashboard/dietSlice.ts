import { mealData, MealData } from '@/app/api/meals/mealData'
import { createClientBrowser } from '@/utils/supabase/client'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import CryptoJS from 'crypto-js'
const supabase = createClientBrowser()
const USERDB = process.env.NEXT_PUBLIC_SUPABASE_DATABASE_USER_PROFILE!

type STATE = {
    FOOD: MealData | null
    FOODNAME: String | null
    USERDIET: DietChange[] | null
    STATE: 'idle' | 'pending' | 'success'
}

const initialState: STATE = {
    FOOD: null,
    FOODNAME: null,
    USERDIET: null,
    STATE: 'idle',
}

export interface DietChange {
    id: number
    name: string
    calorie: number
    protein: number
    fat: number
    carb: number
    method?: string
}

export const saveRecentDiet = createAsyncThunk(
    'diet/save',
    async (dietChanges: DietChange) => {
        const { method } = dietChanges

        const {
            data: { user },
        } = await supabase.auth.getUser()
        const userID: string | null = user
            ? CryptoJS.MD5(user.id).toString()
            : null

        const { data: userRecord, error: fetchError } = await supabase
            .from(USERDB)
            .select('diet')
            .eq('userID', userID)
            .single()

        const dietArray: any[] = userRecord?.diet || []

        if (method === 'save') {
            dietArray.push(dietChanges)
        }
        // else if (method === 'remove') {
        //     const nameToRemove = '123';
        //     const filteredDietArray = dietArray.filter(d => d.name !== nameToRemove);
        //     dietArray.length = 0; // Clear the array
        //     dietArray.push(...filteredDietArray);
        // }

        const { error: updateError } = await supabase
            .from(USERDB)
            .update({ diet: dietArray })
            .eq('userID', userID)

        // To be removed later
        window.location.href = window.location.href
    }
)

export const fetchDiet = createAsyncThunk('diet/fetch-user', async () => {
    const {
        data: { user },
    } = await supabase.auth.getUser()
    const userID: string | null = user ? CryptoJS.MD5(user.id).toString() : null

    const { data: userRecord, error: fetchError } = await supabase
        .from(USERDB)
        .select('diet')
        .eq('userID', userID)
        .single()

    return userRecord?.diet as DietChange[]
})

const dietSlice = createSlice({
    name: 'dietSlice',
    initialState,
    reducers: {
        getFoodData(state, action: PayloadAction<string>) {
            state.FOOD = null
            state.FOOD = mealData.filter(
                (item) => item.name === action.payload
            )[0]
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            fetchDiet.fulfilled,
            (state, action: PayloadAction<DietChange[]>) => {
                state.STATE = 'success'
                state.USERDIET = action.payload
            }
        ),
            builder.addCase(fetchDiet.pending, (state) => {
                state.STATE = 'pending'
            })
    },
})

export const { getFoodData } = dietSlice.actions
export default dietSlice.reducer
