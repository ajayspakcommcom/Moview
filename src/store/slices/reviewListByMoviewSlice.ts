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
    });

    const resp = await response.json();
    return resp.data.reviews;
});

export const createReviewListByMovie = createAsyncThunk('reviewListByMovie/createReviewListByMovie', async ({ url, token, movie, user, rating, comment }: { url: string, token: string, movie: string, user: string, rating: number, comment: string }) => {

    // const response = await fetch(`${url}review`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${token}`,
    //     },
    //     body: JSON.stringify({
    //         "movie": movie,
    //         "user": user,
    //         "rating": rating,
    //         "review_text": comment
    //     }),
    // });

    // const resp = await response.json();
    // return resp.data.reviews as Review;

    return {
        "_id": "66f5228aa6642108d7ecd1ea",
        "movie": "66a2074a519ff3d289917c02",
        "user": {
            "_id": "66a367ee470675a3aa79ccb3",
            "firstname": "omkar"
        },
        "rating": 5,
        "review_text": "api sujeet",
        "is_deleted": false,
        "created_at": "2024-09-26T08:59:54.961Z",
        "__v": 0
    }

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
            .addCase(createReviewListByMovie.pending, (state) => {
                state.loading = true;
                //console.log("movie list:", JSON.stringify(state.data, null, 2));
            })
            .addCase(createReviewListByMovie.fulfilled, (state, action) => {
                state.loading = false;
                state.data.push(action.payload);
                console.log("createReview.fulfilled");
            })
            .addCase(createReviewListByMovie.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null;
                console.log("createReview.rejected", action.error.message);
            })
    },
});


export default reviewListByMoviewSlice.reducer;
