import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import counterReducer from './slices/counterSlice';


const store = configureStore({
    reducer: {
        counter: counterReducer
    },
});

// Types for dispatch and state
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hook for useDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
