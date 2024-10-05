import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { FollowerType } from '../../models/Follower';

interface FollowerState {
    data: FollowerType[];
    loading: boolean;
    error: string | null;
    count: number;
}

const initialState: FollowerState = {
    data: [],
    loading: false,
    error: null,
    count: 0
};

export const fetchFollowers = createAsyncThunk('follower/fetchFollowers', async ({ url, token }: { url: string, token: string }) => {
    const response = await fetch(`${url}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    const resp = await response.json();
    return resp.data as FollowerType[];
});


export const createFollower = createAsyncThunk('follower/createFollower', async ({ url, token, userId, followerId }: { url: string; token: string; userId: string; followerId: string }, { rejectWithValue }) => {

    try {
        const response = await fetch(`${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                userId,
                followerId,
            }),
        });

        const resp = await response.json();

        return {
            data: resp.data as FollowerType,
            message: resp.message || 'Follower created successfully',
        };

    } catch (error: any) {
        console.error('Error creating follower:', error);
        return rejectWithValue('An unexpected error occurred while creating follower');
    }
}
);

export const removeFollower = createAsyncThunk('follower/removeFollower', async ({ url, token, userId, followerId }: { url: string; token: string; userId: string; followerId: string }, { rejectWithValue }) => {

    try {
        const response = await fetch(`${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                userId,
                followerId,
            }),
        });

        const resp = await response.json();

        return {
            data: resp.data as FollowerType,
            message: resp.message || 'Follower removed successfully',
        };

    } catch (error: any) {
        console.error('Error removing follower:', error);
        return rejectWithValue('An unexpected error occurred while removing follower');
    }
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
                state.count = state.data.length;
            })
            .addCase(fetchFollowers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null;
            })
            .addCase(createFollower.pending, (state) => {
                state.loading = true;
            })
            .addCase(createFollower.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.data.findIndex(item => item.followerId._id === action.payload.data.followerId._id);
                if (index !== -1) {
                    state.data[index] = action.payload.data;
                }
            })
            .addCase(createFollower.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null;
            })

            .addCase(removeFollower.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeFollower.fulfilled, (state, action) => {
                state.loading = false;
                const respData = state.data.filter(item => item.followerId._id !== action.payload.data.followerId._id);
                //state.data = respData.length > 0 ? respData : [...respData];
                state.data = respData;
            })
            .addCase(removeFollower.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null;
            })
    },
});


export default followerSlice.reducer;
