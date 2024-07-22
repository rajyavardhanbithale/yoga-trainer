import { UserProfilePublic } from '@/types'
import { createClientBrowser } from '@/utils/supabase/client'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import CryptoJS from 'crypto-js'

const USERDB = process.env.NEXT_PUBLIC_SUPABASE_DATABASE_USER_PROFILE!

const supabase = createClientBrowser()

type STATE = {
    PROFILE: UserProfilePublic | null
    USERLIKE: number[] | null
    status: 'idle' | 'pending' | 'success' | 'error'

    statusLikeUnlike: 'idle' | 'pending'
}

const initialState: STATE = {
    PROFILE: null,
    USERLIKE: null,
    status: 'idle',
    statusLikeUnlike: 'idle',
}

export const fetchUserProfile = createAsyncThunk('user/profile', async () => {
    const {
        data: { user },
    } = await supabase.auth.getUser()
    const userID: string | null = user ? CryptoJS.MD5(user.id).toString() : null

    const { data, error } = await supabase
        .from(USERDB)
        .select('*')
        .eq('userID', userID)
        .single()

    const FDT = data && data
    const response: UserProfilePublic = {
        name: user?.user_metadata.name,
        userID: FDT.user_public_id,
        date: new Date(FDT.created_at).getTime(),
        isPublic: FDT.profile_type === 'public' ? true : false,
        image: FDT.profile_pic,
        country: FDT.country,
        achievements: FDT.achievements,
    }

    return response
})

export const fetchUserLike = createAsyncThunk(
    'user/user-food-like',
    async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser()
        const userID: string | null = user
            ? CryptoJS.MD5(user.id).toString()
            : null

        const { data, error } = await supabase
            .from(USERDB)
            .select('food_like')
            .eq('userID', userID)
            .single()

        return data && data.food_like
    }
)

export const likeFoodPost = createAsyncThunk(
    'user/food-add-like',
    async (info: any) => {
        const { id, method } = info

        const {
            data: { user },
        } = await supabase.auth.getUser()
        const userID: string | null = user
            ? CryptoJS.MD5(user.id).toString()
            : null

        // updating global likes
        const { data: foodData, error } = await supabase
            .from('food-data')
            .select()
            .eq('id', id)
            .single()

        const updatedLike =
            method === 'like'
                ? (foodData?.likes ?? 0) + 1
                : method === 'unlike'
                    ? (foodData?.likes ?? 0) - 1
                    : 0

        const { error: updateFoodError } = await supabase
            .from('food-data')
            .update({ likes: updatedLike })
            .eq('id', id)

        // updating user likes
        const { data: userLikeData, error: userLikeError } = await supabase
            .from(USERDB)
            .select('food_like')
            .eq('userID', userID)
            .single()

        const currentLikes: string[] = userLikeData?.food_like || []
        let updatedLikes: string[]

        if (method === 'like') {
            updatedLikes = [...currentLikes, id]
        } else if (method === 'unlike') {
            updatedLikes = currentLikes.filter((likeId) => likeId !== id)
        } else {
            updatedLikes = currentLikes
        }
        const { error: updateUserError } = await supabase
            .from(USERDB)
            .update({ food_like: updatedLikes })
            .eq('userID', userID)

        return true
    }
)

const profileSlice = createSlice({
    name: 'profileSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            fetchUserProfile.fulfilled,
            (state, action: PayloadAction<UserProfilePublic>) => {
                state.PROFILE = action.payload
            }
        )

        builder.addCase(
            fetchUserLike.pending,
            (state, action: PayloadAction<any>) => {
                state.USERLIKE = action.payload
                state.status = 'pending'
            }
        )
        builder.addCase(
            fetchUserLike.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.USERLIKE = action.payload
                state.status = 'success'
            }
        )

        builder.addCase(
            likeFoodPost.pending,
            (state, action: PayloadAction<any>) => {
                state.status = 'pending'
            }
        )
        builder.addCase(
            likeFoodPost.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.status = 'success'
            }
        )
    },
})

export default profileSlice.reducer
