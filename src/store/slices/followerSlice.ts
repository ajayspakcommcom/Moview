import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { FollowerType } from '../../models/Follower';

interface FollowerState {
    data: FollowerType[]; //Adjust type as necessary
    loading: boolean;
    error: string | null;
}

const initialState: FollowerState = {
    data: [],
    loading: false,
    error: null
};

export const fetchFollowers = createAsyncThunk('follower/fetchFollowers', async ({ url, token }: { url: string, token: string }) => {
    console.log('fetchFollowers', { url, token });
    const response = await fetch(`${url}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }); //Replace with your API endpoint

    const resp = await response.json();
    return resp.data as FollowerType[];
});


export const createFollower = createAsyncThunk('follower/createFollower', async ({ url, token, userId, followerId }: { url: string, token: string, userId: string, followerId: string }, { rejectWithValue }) => {

    const response = await fetch(`${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            userId,
            followerId
        }),
    });

    const resp = await response.json();
    return resp.data as FollowerType;

}
);




const followerSlice = createSlice({
    name: 'followers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFollowers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchFollowers.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                console.log('data', state.data);
            })
            .addCase(fetchFollowers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null;
            })

            .addCase(createFollower.pending, (state) => {
                state.loading = true;
                console.log('createFollower.pending');
            })
            .addCase(createFollower.fulfilled, (state, action) => {
                state.loading = false;
                state.data = [...state.data, action.payload];
                console.log('createFollower.fulfilled');
            })
            .addCase(createFollower.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null;
                console.log('createFollower.rejected', state.error);
            })
    },
});


export default followerSlice.reducer;
