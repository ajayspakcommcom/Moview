import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Notification } from '../../types/Notification';

interface NotificationState {
    data: Notification[]; //Adjust type as necessary
    loading: boolean;
    error: string | null;
}

const initialState: NotificationState = {
    data: [],
    loading: false,
    error: null
};

export const fetchNotifications = createAsyncThunk('notification/fetchNotifications', async ({ url, token }: { url: string, token: string }) => {
    console.log('fetchNotifications', { url, token });
    const response = await fetch(`${url}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }); //Replace with your API endpoint

    const resp = await response.json();
    return resp.data.notifications as Notification[];
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
    return resp.data.notifications as Notification[];
});

// export const createNotification = createAsyncThunk('notification/createNotification', async ({ url, token, user_id, title, message, type }: { url: string, token: string, user_id: string, title: string, message: string, type: string }) => {
//     const response = await fetch(`${url}`, {
//         method: 'POST',
//         headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ user_id, title, message, type })
//     });

//     const resp = await response.json();
//     return resp.data.notifications as Notification[];
// });


export const createNotification = createAsyncThunk('notification/createNotification', async ({ url, token, user_id, title, message, type, movie_show_id }: { url: string; token: string; user_id: string; title: string; message: string; type: string, movie_show_id: string }, { rejectWithValue }) => {
    try {
        const response = await fetch(`${url}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id, title, message, type, movie_show_id }),
        });

        // Log response to see what's being returned
        const textResponse = await response.text();
        // Check if response is not 200
        if (response.status !== 200) {
            // Attempt to parse as JSON only if content type is JSON
            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                const errorDetails = JSON.parse(textResponse); // Parse only if JSON
                return rejectWithValue(errorDetails);
            } else {
                return rejectWithValue('Non-JSON error response: ' + textResponse);
            }
        }

        // Ensure the response is JSON
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
            const resp = JSON.parse(textResponse); // Parse as JSON if it's JSON

            if (resp && resp.data && resp.data.notifications) {
                return resp.data.notifications as Notification[];
            } else {
                return rejectWithValue('Unexpected response structure');
            }
        } else {
            return rejectWithValue('Non-JSON success response: ' + textResponse);
        }
    } catch (error) {
        console.log('Error creating notification:', error); // Detailed logging
        return rejectWithValue('Failed to create notification');
    }
}
);




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

export const deleteNotification = createAsyncThunk('notification/deleteNotification', async ({ url, token, _id }: { url: string, token: string, _id: string }) => {
    const response = await fetch(`${url}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    const resp = await response.json();
    return resp.data._id;
});


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
                console.log('data', state.data);
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

            .addCase(createNotification.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(createNotification.fulfilled, (state, action) => {
                state.loading = false;
                state.data = [...state.data, ...action.payload];
            })
            .addCase(createNotification.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null;
            })

            .addCase(updateNotification.fulfilled, (state, action) => {
                const index = state.data.findIndex(notification => notification._id === action.payload._id);
                if (index !== -1) {
                    state.data[index] = action.payload;
                }
            })

            .addCase(deleteNotification.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteNotification.fulfilled, (state, action) => {
                state.data = state.data.filter(notification => notification._id !== action.payload);
            })
            .addCase(deleteNotification.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null;
            })
    },
});


export default notificationSlice.reducer;
