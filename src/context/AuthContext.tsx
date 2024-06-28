
import React, { createContext, useContext, useState, ReactNode, useLayoutEffect } from 'react';
import { getData, removeData, storeData } from '../utils/Storage';

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

    const login = (username: string, password: string) => {
        const userData: User = { username: username, password: password };
        storeData('userToken', userData);
        setUser(userData);
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
