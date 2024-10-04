import React, { createContext, useContext, useState, ReactNode, useLayoutEffect } from 'react';
import { API_URL } from '../configure/config.android';

import { useAppDispatch } from '../store/index';


import { fetchReviewsByUserId as fetchMovieReviewsByUserId } from '../store/slices/myMovieReviewSlice';
import { fetchReviewsByUserId as fetchShowReviewsByUserId } from '../store/slices/myShowReviewSlice';
import { fetchNotificationsByUserId } from '../store/slices/notificationSlice';



interface User {
    username: string;
    password: string;
    token?: string;
}

interface ResponseError {
    message: string;
    status: string;
}

interface AuthContextType {
    user: User | null;
    login: (username: string, password: string) => void;
    logout: () => void;
    responseError: ResponseError | null;
    userDetail: any;
    counter: number;
    appCounter: () => void;
    updateUserDetail: (data: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

    const [user, setUser] = useState<User | null>(null);
    const [responseError, setResponseError] = useState<ResponseError | null>(null);
    const [userDetail, setUserDetail] = useState<any>(null);
    const [counter, setCounter] = useState<any>(0);

    const dispatch = useAppDispatch();
    


    useLayoutEffect(() => {

    }, []);

    const login = async (username: string, password: string) => {
        const userData: User = { username, password };

        try {
            const response = await fetch(`${API_URL}login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            const result = await response.json();

            if (result.status === 'success') {
                setUser({ username: result.userDetail.firstname, token: result.token } as User);
                setResponseError(null);
                setUserDetail(result.userDetail);

                const movieUrl = `${API_URL}review/user/${result.userDetail?._id}`;
                const showUrl = `${API_URL}review-show/user/${result.userDetail?._id}`;
                dispatch(fetchMovieReviewsByUserId({ url: movieUrl, token: result.token }));
                dispatch(fetchShowReviewsByUserId({ url: showUrl, token: result.token }));
                const notificationUrl = `${API_URL}notification/follower/${result.userDetail?._id}`;
                dispatch(fetchNotificationsByUserId({ url: notificationUrl, token: result.token }));
            }
            else {
                setResponseError({ message: result.message, status: result.status });

            }

        } catch (error) {
            setResponseError({ message: 'Login Failed', status: 'error' });

        }
    };

    const appCounter = () => {
        setCounter(counter + 1);        
    };

    const logout = async () => {
        setCounter(0);
        setUser(null);
    };

    const updateUserDetail = (data: any) => {
        setUserDetail(data);
    };

    const authContextValue: AuthContextType = {
        user,
        login,
        logout,
        responseError,
        userDetail,
        counter,
        appCounter,
        updateUserDetail
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};
