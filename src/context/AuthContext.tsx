// AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of our user object
interface User {
    username: string;
    email: string;
}

// Define the shape of our context
interface AuthContextType {
    user: User | null;
    login: (username: string, password: string) => void;
    logout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use AuthContext
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

// AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    // Simulate login function
    const login = (username: string, password: string) => {
        // Example: In a real app, this would be an API call
        const userData: User = {
            username: username,
            email: `${username}@example.com`, // Simulate email for simplicity
        };
        setUser(userData);
    };

    const logout = () => {
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
