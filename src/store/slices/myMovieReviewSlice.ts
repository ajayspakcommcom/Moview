import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Review } from '../../models/Review';
import { MovieReviewResponse } from '../../models/MyReview';

interface MyMovieReviewState {
    data: MovieReviewResponse[]; //Adjust type as necessary
    loading: boolean;
    error: string | null;
}

const initialState: MyMovieReviewState = {
    data: [],
    loading: false,
    error: null,
};

export const fetchReviews = createAsyncThunk('reviews/fetchReviews', async () => {
    const response = await fetch('/api/reviews'); // Replace with your API endpoint
    const resp = await response.json();
    return resp.data.reviews;
});

export const fetchReviewsByUserId = createAsyncThunk('moviewreviews/fetchReviewsByUserId', async ({ url, token }: { url: string, token: string }) => {
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

export const createReview = createAsyncThunk('reviews/createReview', async (review: Review) => {
    const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(review),
    });
    const resp = await response.json();
    return resp;
});

export const updateReview = createAsyncThunk('reviews/updateReview', async ({ id, review }: { id: string, review: Review }) => {
    const response = await fetch(`/api/reviews/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(review),
    });
    const resp = await response.json();
    return resp;
});

// export const deleteReview = createAsyncThunk('reviews/deleteReview', async (id) => {
//     await fetch(`/api/reviews/${id}`, {
//         method: 'DELETE',
//     });
//     return id;
// });


const myMovieReviewSlice = createSlice({
    name: 'myMovieReviews',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReviews.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchReviews.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchReviews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null;
            })

            .addCase(fetchReviewsByUserId.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchReviewsByUserId.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchReviewsByUserId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null;
            })

            .addCase(createReview.fulfilled, (state, action) => {
                state.data.push(action.payload);
            })
            .addCase(updateReview.fulfilled, (state, action) => {
                const index = state.data.findIndex(review => review._id === action.payload._id);
                if (index !== -1) {
                    state.data[index] = action.payload;
                }
            })
        // .addCase(deleteReview.fulfilled, (state, action) => {
        //     state.reviews = state.reviews.filter(review => review._id !== action.payload);
        // });
    },
});


export default myMovieReviewSlice.reducer;
