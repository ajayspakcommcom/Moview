import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { FollowerType } from '../../models/Follower';

interface UserFollowerState {
    data: FollowerType[];
    loading: boolean;
    error: string | null;
    count: number;
}

const initialState: UserFollowerState = {
    data: [],
    loading: false,
    error: null,
    count: 0
};

export const userFetchFollowers = createAsyncThunk('follower/userFetchFollowers', async ({ url, token }: { url: string, token: string }) => {
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


export const userCreateFollower = createAsyncThunk('follower/userCreateFollower', async ({ url, token, userId, followerId }: { url: string; token: string; userId: string; followerId: string }, { rejectWithValue }) => {

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

export const userRemoveFollower = createAsyncThunk('follower/userRemoveFollower', async ({ url, token, userId, followerId }: { url: string; token: string; userId: string; followerId: string }, { rejectWithValue }) => {

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


const userFollowerSlice = createSlice({
    name: 'userFollowers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(userFetchFollowers.pending, (state) => {
                state.loading = true;
            })
            .addCase(userFetchFollowers.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.count = state.data.length;
            })
            .addCase(userFetchFollowers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null;
            })
            .addCase(userCreateFollower.pending, (state) => {
                state.loading = true;
            })
            .addCase(userCreateFollower.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.data.findIndex(item => item.followerId._id === action.payload.data.followerId._id);
                if (index !== -1) {
                    state.data[index] = action.payload.data;
                }
            })
            .addCase(userCreateFollower.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null;
            })

            .addCase(userRemoveFollower.pending, (state) => {
                state.loading = true;
            })
            .addCase(userRemoveFollower.fulfilled, (state, action) => {
                state.loading = false;
                state.data = state.data.filter(item => item.followerId._id !== action.payload.data.followerId._id);
            })
            .addCase(userRemoveFollower.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null;
            })
    },
});


export default userFollowerSlice.reducer;
