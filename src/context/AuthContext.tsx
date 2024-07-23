
import React, { createContext, useContext, useState, ReactNode, useLayoutEffect } from 'react';
import { getData, removeData, storeData } from '../utils/Storage';
import { API_URL } from '../configure/config.android';

interface User {
    username: string;
    password: string;
}


interface AuthContextType {
    user: User | null;
    login: (username: string, password: string) => void;
    logout: () => void;
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

    useLayoutEffect(() => {
        const fetchData = async () => {
            const data = await getData('userToken');
            setUser(data);
        };
        fetchData();
    }, []);

    const login = async (username: string, password: string) => {
        const userData: User = { username: username, password: password };

        //console.log(API_URL);

        // storeData('userToken', userData);
        // setUser(userData);


        try {
            const response = await fetch(`${API_URL}login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const result = await response.json();
            console.log(result);

            // if (response.ok) {
            //     console.log('Login successful:', result.token);
            //     // await storeData('userToken', result.token);
            //     // setUser({ username, token: result.token });
            // } else {
            //     console.error('Login failed:', result.status);
            // }

        } catch (error) {
            console.error('Error logging in:', error);
        }


    };

    const logout = () => {
        removeData('userToken');
        setUser(null);
    };

    const authContextValue: AuthContextType = {
        user,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};
