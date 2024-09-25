import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Review } from '../../models/Review';


interface ReviewListByShowState {
    data: Review[]; //Adjust type as necessary
    loading: boolean;
    error: string | null;
}

const initialState: ReviewListByShowState = {
    data: [],
    loading: false,
    error: null,
};

export const fetchReviewListByShow = createAsyncThunk('reviewListByShow/fetchReviewListByShow', async ({ url, token }: { url: string, token: string }) => {

    const response = await fetch(`${url}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }); //Replace with your API endpoint

    const resp = await response.json();
    return resp.data.reviews;
});



const reviewListByShowSlice = createSlice({
    name: 'reviewListByShow',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReviewListByShow.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchReviewListByShow.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchReviewListByShow.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null;
            })
    },
});


export default reviewListByShowSlice.reducer;
