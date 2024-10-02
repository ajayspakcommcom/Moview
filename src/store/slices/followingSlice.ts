import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { FollowingType } from '../../models/Following';

interface FollowingState {
    data: FollowingType[]; //Adjust type as necessary
    loading: boolean;
    error: string | null;
}

const initialState: FollowingState = {
    data: [],
    loading: false,
    error: null
};

export const fetchFollowings = createAsyncThunk('following/fetchFollowings', async ({ url, token }: { url: string, token: string }) => {
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


const followingSlice = createSlice({
    name: 'followings',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFollowings.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchFollowings.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchFollowings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null;
            })
    },
});


export default followingSlice.reducer;
