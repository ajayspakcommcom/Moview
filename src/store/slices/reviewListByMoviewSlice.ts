import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Review } from '../../models/Review';


interface ReviewListByMovieState {
    data: Review[]; //Adjust type as necessary
    loading: boolean;
    error: string | null;
}

const initialState: ReviewListByMovieState = {
    data: [],
    loading: false,
    error: null,
};

export const fetchReviewListByMovie = createAsyncThunk('reviewListByMovie/fetchReviewListByMovie', async ({ url, token }: { url: string, token: string }) => {

    const response = await fetch(`${url}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }); //Replace with your API endpoint

    const resp = await response.json();
    //console.log('fetchReviewListByMovie...', resp);
    return resp.data.reviews;
});



const reviewListByMoviewSlice = createSlice({
    name: 'reviewListByMovie',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReviewListByMovie.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchReviewListByMovie.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchReviewListByMovie.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null;
            })
    },
});


export default reviewListByMoviewSlice.reducer;
