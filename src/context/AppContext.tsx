import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ScreenDetail {
    currentScreenName: string;
    currentTabtabName: string;
}

interface AppContextType {
    screenDetail: ScreenDetail | null;
    screenDetailHandler: (curretScreenName: string, currentTabtabName: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};

interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [screenDetail, serScreenDetail] = useState<ScreenDetail | null>(null);

    const screenDetailHandler = (screenName: string, tabName: string) => {
        const screenDetail: ScreenDetail = {
            currentScreenName: screenName,
            currentTabtabName: tabName,
        };
        serScreenDetail(screenDetail);
    };

    const appContextValue: AppContextType = {
        screenDetail,
        screenDetailHandler
    };

    return (
        <AppContext.Provider value={appContextValue}>
            {children}
        </AppContext.Provider>
    );
};
