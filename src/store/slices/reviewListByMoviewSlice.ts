import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Review } from '../../models/Review';


interface ReviewListByMovieState {
    data: any[]; //Adjust type as necessary
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
    });

    const resp = await response.json();
    return resp.data.reviews as Review[];
});

export const createReviewListByMovie = createAsyncThunk('reviewListByMovie/createReviewListByMovie', async ({ url, token, movie, user, rating, comment }: { url: string, token: string, movie: string, user: string, rating: number, comment: string }) => {

    const response = await fetch(`${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            "movie": movie,
            "user": user,
            "rating": rating,
            "review_text": comment
        }),
    });

    const resp = await response.json();
    return resp.data.reviews as Review;
}
);



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
            .addCase(createReviewListByMovie.pending, (state) => {
                state.loading = true;
            })
            .addCase(createReviewListByMovie.fulfilled, (state, action) => {
                state.loading = false;
                state.data = [...state.data, action.payload];
            })
            .addCase(createReviewListByMovie.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null;
            })
    },
});


export default reviewListByMoviewSlice.reducer;
