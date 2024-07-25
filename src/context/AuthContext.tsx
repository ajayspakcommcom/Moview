import React, { createContext, useContext, useState, ReactNode, useLayoutEffect } from 'react';
import { getData, removeData, storeData } from '../utils/Storage';
import { API_URL } from '../configure/config.android';

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

    useLayoutEffect(() => {
        const fetchData = async () => {
            const data = await getData('userToken');
            if (data) {
                setUser({ ...user, token: data } as User);
            }
        };
        fetchData();
    }, []);

    const login = async (username: string, password: string) => {
        const userData: User = { username, password };
        // console.log('Ram...');
        // console.log(userData)

        try {
            const response = await fetch(`${API_URL}login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            const result = await response.json();
            console.log('result', result);

            if (result.status === 'success') {
                await storeData('userToken', result.token);
                setUser({ username: result.userDetail.firstname, token: result.token } as User);
                setResponseError(null); // Clear previous errors
                console.log('success');
            }
            else {
                setResponseError({ message: result.message, status: result.status });
                console.log('error');
            }

        } catch (error) {
            setResponseError({ message: 'Login Failed', status: 'error' });
            console.log(error);
        }
    };

    const logout = async () => {
        await removeData('userToken');
        setUser(null);
    };

    const authContextValue: AuthContextType = {
        user,
        login,
        logout,
        responseError,
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};
