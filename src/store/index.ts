import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import counterReducer from './slices/counterSlice';
import myMovieReviewReducer from './slices/myMovieReviewSlice';
import myShowReviewReducer from './slices/myShowReviewSlice';
import notificationReducer from './slices/notificationSlice';
const store = configureStore({
    reducer: {
        counter: counterReducer,
        myMovieReview: myMovieReviewReducer,
        myShowReview: myShowReviewReducer,
        notification: notificationReducer,
    },
});

// Types for dispatch and state
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hook for useDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;