import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Review } from '../../models/Review';
import { ShowReviewResponse } from '../../models/MyReview';
import { Notification } from '../../types/Notification';

interface NotificationState {
    data: Notification[]; //Adjust type as necessary
    loading: boolean;
    error: string | null;
}

const initialState: NotificationState = {
    data: [],
    loading: false,
    error: null,
};

export const fetchNotifications = createAsyncThunk('notification/fetchNotifications', async () => {
    const response = await fetch('/api/notification'); // Replace with your API endpoint
    const resp = await response.json();
    return resp.data.reviews;
});

export const fetchNotificationsByUserId = createAsyncThunk('notification/fetchNotificationsByUserId', async ({ url, token }: { url: string, token: string }) => {
    const response = await fetch(`${url}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }); //Replace with your API endpoint

    const resp = await response.json();
    return resp.data.notification;
});

export const createNotification = createAsyncThunk('notification/createNotification', async (notification: Notification) => {
    const response = await fetch('/api/notification', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(notification),
    });

    const resp = await response.json();
    return resp;
});

export const updateNotification = createAsyncThunk('notification/updateNotification', async ({ id, notification }: { id: string, notification: Notification }) => {
    const response = await fetch(`/api/notification/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(notification),
    });
    const resp = await response.json();
    return resp;
});

// export const deleteNotification = createAsyncThunk('reviews/deleteNotification', async (id) => {
//     await fetch(`/api/reviews/${id}`, {
//         method: 'DELETE',
//     });
//     return id;
// });


const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotifications.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchNotifications.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchNotifications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null;
            })

            .addCase(fetchNotificationsByUserId.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchNotificationsByUserId.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchNotificationsByUserId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null;
            })

            .addCase(createNotification.fulfilled, (state, action) => {
                state.data.push(action.payload);
            })
            .addCase(updateNotification.fulfilled, (state, action) => {
                const index = state.data.findIndex(notification => notification._id === action.payload._id);
                if (index !== -1) {
                    state.data[index] = action.payload;
                }
            })
        // .addCase(deleteReview.fulfilled, (state, action) => {
        //     state.reviews = state.reviews.filter(review => review._id !== action.payload);
        // });
    },
});


export default notificationSlice.reducer;
