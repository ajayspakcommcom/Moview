import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { FollowingType } from '../../models/Following';

interface UserFollowingState {
    data: FollowingType[]; //Adjust type as necessary
    loading: boolean;
    error: string | null;
    count: number;
}

const initialState: UserFollowingState = {
    data: [],
    loading: false,
    error: null,
    count: 0
};

export const userFetchFollowings = createAsyncThunk('following/userFetchFollowings', async ({ url, token }: { url: string, token: string }) => {
    const response = await fetch(`${url}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    const resp = await response.json();
    return resp.data as FollowingType[];
});


const userFollowingSlice = createSlice({
    name: 'followings',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(userFetchFollowings.pending, (state) => {
                state.loading = true;
            })
            .addCase(userFetchFollowings.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.count = state.data.length;
            })
            .addCase(userFetchFollowings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null;
            })
    },
});


export default userFollowingSlice.reducer;
