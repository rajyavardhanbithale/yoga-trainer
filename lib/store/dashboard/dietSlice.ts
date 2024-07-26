import { mealData, MealData } from '@/app/api/diet/mealData'
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
    operation: string | null
    optimisticDiet: DietChange[] | null
}

const initialState: STATE = {
    FOOD: null,
    FOODNAME: null,
    USERDIET: null,
    STATE: 'idle',
    operation: null,
    optimisticDiet: null,
}

export interface DietChange {
    id: number
    name: string
    calorie: number
    protein: number
    fat: number
    carb: number
}

export const saveRecentDiet = createAsyncThunk<
    DietChange[],
    { dietChanges: DietChange; method: string }
>('diet/save', async ({ dietChanges, method }) => {
    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser()

    if (userError) throw userError

    const userID: string | null = user ? CryptoJS.MD5(user.id).toString() : null

    const { data: userRecord, error: fetchError } = await supabase
        .from(USERDB)
        .select('diet')
        .eq('userID', userID)
        .single()

    if (fetchError) throw fetchError

    const dietArray: DietChange[] = userRecord?.diet || []

    if (method === 'save') {
        dietArray.push(dietChanges)
    } else if (method === 'remove') {
        const nameToRemove = dietChanges.id
        const filteredDietArray = dietArray.filter(
            (d) => d.id !== nameToRemove
        )
        dietArray.length = 0
        dietArray.push(...filteredDietArray)
    }

    const { error: updateError } = await supabase
        .from(USERDB)
        .update({ diet: dietArray })
        .eq('userID', userID)

    if (updateError) throw updateError

    return dietArray
})

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

        builder.addCase(saveRecentDiet.pending, (state) => {
            state.operation = 'saveDiet'
            state.STATE = 'pending'
        })
        builder.addCase(saveRecentDiet.fulfilled, (state, action) => {
            state.operation = 'saveDiet'
            state.STATE = 'success'
            state.optimisticDiet = action.payload
        })
    },
})

export const { getFoodData } = dietSlice.actions
export default dietSlice.reducer
