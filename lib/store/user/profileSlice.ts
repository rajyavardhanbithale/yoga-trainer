import { UserProfilePublic } from '@/types';
import { createClientBrowser } from '@/utils/supabase/client';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import CryptoJS from 'crypto-js';

const USERDB = process.env.NEXT_PUBLIC_SUPABASE_DATABASE_USER_PROFILE!;

const supabase = createClientBrowser();

type STATE = {
    PROFILE: UserProfilePublic | null;
    USERLIKE: number[] | null;
    status: 'idle' | 'pending' | 'success' | 'error';
    statusLikeUnlike: 'idle' | 'pending';
    PRIORERROR: 'idle' | 'error';
};

const initialState: STATE = {
    PROFILE: null,
    USERLIKE: null,
    status: 'idle',
    statusLikeUnlike: 'idle',
    PRIORERROR: 'idle',
};

export const fetchUserProfile = createAsyncThunk<UserProfilePublic, void, { rejectValue: string }>(
    'user/profile',
    async (_, thunkAPI) => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            const userID: string | null = user ? CryptoJS.MD5(user.id).toString() : null;

            const { data, error } = await supabase
                .from(USERDB)
                .select('*')
                .eq('userID', userID)
                .single();

            if (error) throw new Error(error.message);

            const FDT = data || {};
            return {
                name: user?.user_metadata.name || '',
                userID: FDT.user_public_id || '',
                date: new Date(FDT.created_at).getTime(),
                isPublic: FDT.profile_type === 'public',
                image: FDT.profile_pic || '',
                country: FDT.country || '',
                achievements: FDT.achievements || [],
            } as UserProfilePublic;
        } catch (error) {
            return thunkAPI.rejectWithValue('Failed to fetch user profile');
        }
    }
);

export const fetchUserLike = createAsyncThunk<number[] | null, void, { rejectValue: string }>(
    'user/user-food-like',
    async (_, thunkAPI) => {
        try {
            const { data: { user }, error: userError } = await supabase.auth.getUser();
            if (userError) return thunkAPI.rejectWithValue(userError.message);

            const userID = user ? CryptoJS.MD5(user.id).toString() : null;

            const { data, error } = await supabase
                .from(USERDB)
                .select('food_like')
                .eq('userID', userID)
                .single();

            if (error) return thunkAPI.rejectWithValue(error.message);

            return data ? data.food_like : null;
        } catch (error) {
            return thunkAPI.rejectWithValue('An unexpected error occurred');
        }
    }
);

export const likeFoodPost = createAsyncThunk<boolean, { id: number; method: 'like' | 'unlike' }>(
    'user/food-add-like',
    async ({ id, method }, thunkAPI) => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            const userID = user ? CryptoJS.MD5(user.id).toString() : null;

            // Updating food likes
            const { data: foodData, error: foodError } = await supabase
                .from('food-data')
                .select()
                .eq('id', id)
                .single();

            if (foodError) throw new Error(foodError.message);

            const updatedLike = method === 'like' ? (foodData?.likes ?? 0) + 1 : (foodData?.likes ?? 0) - 1;
            const { error: updateFoodError } = await supabase
                .from('food-data')
                .update({ likes: updatedLike, views: (foodData?.views ?? 0) + 1 })
                .eq('id', id);

            if (updateFoodError) throw new Error(updateFoodError.message);

            // Updating user likes
            const { data: userLikeData, error: userLikeError } = await supabase
                .from(USERDB)
                .select('food_like')
                .eq('userID', userID)
                .single();

            if (userLikeError) throw new Error(userLikeError.message);

            const currentLikes: number[] = userLikeData?.food_like || [];
            const updatedLikes = method === 'like' ? [...currentLikes, id] : currentLikes.filter((likeId) => likeId !== id);

            const { error: updateUserError } = await supabase
                .from(USERDB)
                .update({ food_like: updatedLikes })
                .eq('userID', userID);

            if (updateUserError) throw new Error(updateUserError.message);

            return true;
        } catch (error) {
            return thunkAPI.rejectWithValue('Failed to like/unlike food post');
        }
    }
);

const profileSlice = createSlice({
    name: 'profileSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<UserProfilePublic>) => {
            state.PROFILE = action.payload;
        });

        builder.addCase(fetchUserLike.pending, (state) => {
            state.status = 'pending';
        });

        builder.addCase(fetchUserLike.fulfilled, (state, action: PayloadAction<number[] | null>) => {
            state.USERLIKE = action.payload;
            state.status = 'success';
            state.PRIORERROR = 'idle';
        });

        builder.addCase(fetchUserLike.rejected, (state) => {
            state.PRIORERROR = 'error';
            state.status = 'error';
        });

        builder.addCase(likeFoodPost.pending, (state) => {
            state.status = 'pending';
        });

        builder.addCase(likeFoodPost.fulfilled, (state) => {
            state.status = 'success';
        });

        builder.addCase(likeFoodPost.rejected, (state) => {
            state.status = 'error';
        });
    },
});

export default profileSlice.reducer;
