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

        if (!response.ok) {
            // Extract error message from the response or set a default one
            const errorMessage = resp.error || 'Failed to create follower';
            return rejectWithValue(errorMessage);
        } else {
            // Return success message and data
            return {
                data: resp.data as FollowerType, // Adjust based on your actual data structure
                message: resp.message || 'Follower created successfully',
            };
        }
    } catch (error) {
        // Log the error for debugging purposes
        console.error('Error creating follower:', error);
        return rejectWithValue('An unexpected error occurred while creating follower');
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
                console.log('data', state.data);
            })
            .addCase(fetchFollowers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null;
                console.log('data', state.data);
            })

            .addCase(createFollower.pending, (state) => {
                state.loading = true;
                console.log('createFollower.pending');
            })
            .addCase(createFollower.fulfilled, (state, action) => {
                state.loading = false;
                state.data = [...state.data, action.payload.data];
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
