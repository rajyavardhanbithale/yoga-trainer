import { UserProfilePublic } from '@/types'
import { createClientBrowser } from "@/utils/supabase/client"
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import CryptoJS from "crypto-js"

const USERDB = process.env.NEXT_PUBLIC_SUPABASE_DATABASE_USER_PROFILE!

const supabase = createClientBrowser()

type STATE = {
    PROFILE: UserProfilePublic | null
}

const initialState: STATE = {
    PROFILE: null
}

export const fetchUserProfile = createAsyncThunk(
    'user/profile',
    async () => {
        const { data: { user } } = await supabase.auth.getUser()
        const userID: string | null = user ? CryptoJS.MD5(user.id).toString() : null;

        const { data, error } = await supabase
            .from(USERDB)
            .select('*')
            .eq('userID', userID)
            .single();


        const FDT = data && data
        const response: UserProfilePublic = {
            name: user?.user_metadata.name,
            userID: FDT.user_public_id,
            date: new Date(FDT.created_at).getTime(),
            isPublic: FDT.profile_type === 'public' ? true : false,
            image: FDT.profile_pic,
            country: FDT.country,
            achievements: FDT.achievements
        }

        return response

    }
)

const profileSlice = createSlice({
    name: 'profileSlice',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(fetchUserProfile.fulfilled, (state,action: PayloadAction<UserProfilePublic>)=>{
            state.PROFILE = action.payload
        })
    }
})

export default profileSlice.reducer