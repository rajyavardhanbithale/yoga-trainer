import { UserProfile } from '@/types'
import { createClientBrowser } from "@/utils/supabase/client"
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

import CryptoJS from "crypto-js"

const USERDB = process.env.NEXT_PUBLIC_SUPABASE_DATABASE_USER_PROFILE!

type STATE = {
    USERINFO: UserProfile | null
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState: STATE = {
    USERINFO: null,
    loading: 'idle'
}

const supabase = createClientBrowser()

export const fetchUser = createAsyncThunk(
    'user/profile',
    async () => {
        const { data: { user } } = await supabase.auth.getUser()
        const userID: string | null = user && CryptoJS.MD5(user?.id).toString()

        const fetchDataFromTable = await supabase
            .from(USERDB)
            .select('*')
            .eq('userID', userID)
            .single()

        const FDT = fetchDataFromTable && fetchDataFromTable?.data
        const response: UserProfile = {
            name: user?.user_metadata.name,
            userID: FDT.user_public_id,
            date: new Date(FDT.created_at).getTime(),
            isPublic: FDT.profile_type === 'public' ? true : false,
            image: FDT.profile_pic,
            country: FDT.country
        }

        return response
    }
)

export const toggleProfileVisibility = createAsyncThunk(
    'user/profile-visibility',
    async (visibility: String, { rejectWithValue }) => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            const userID: string | null = user ? CryptoJS.MD5(user.id).toString() : null;

            const { data, error } = await supabase
                .from(USERDB)
                .update({ 'profile_type': visibility })
                .eq('userID', userID)
                .select('*')
                .single();


            const FDT = data && data
            const response: UserProfile = {
                name: user?.user_metadata.name,
                userID: FDT.user_public_id,
                date: new Date(FDT.created_at).getTime(),
                isPublic: FDT.profile_type === 'public' ? true : false,
                image: FDT.profile_pic,
                country: FDT.country
            }


            if (error) {
                throw new Error(error.message);
            } else {
                return response
            }


        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }

)

export const updateProfilePic = createAsyncThunk(
    'user/update-profile-pic',
    async (name: String) => {

        const { data: { user } } = await supabase.auth.getUser();
        const userID: string | null = user ? CryptoJS.MD5(user.id).toString() : null;

        const { data, error } = await supabase
            .from(USERDB)
            .update({ 'profile_pic': name })
            .eq('userID', userID)
            .select('*')
            .single();


        const FDT = data && data
        const response: UserProfile = {
            name: user?.user_metadata.name,
            userID: FDT.user_public_id,
            date: new Date(FDT.created_at).getTime(),
            isPublic: FDT.profile_type === 'public' ? true : false,
            image: FDT.profile_pic,
            country: FDT.country
        }
        console.log(data);
        
        return response

    }

)


const userProfileSlice = createSlice({
    name: "userProfileSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUser.fulfilled, (state, action: PayloadAction<UserProfile>) => {
            state.USERINFO = action.payload
        })

        builder.addCase(toggleProfileVisibility.fulfilled, (state, action) => {
            state.loading = 'succeeded';
            state.USERINFO = action.payload
        })
        builder.addCase(toggleProfileVisibility.pending, (state) => {
            state.loading = 'pending'
        })

        builder.addCase(updateProfilePic.fulfilled, (state, action) => {
            state.loading = 'succeeded';
            state.USERINFO = action.payload
        })

    }
})

export default userProfileSlice.reducer