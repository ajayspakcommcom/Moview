
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { AuthProvider } from './src/context/AuthContext';
import { AppProvider } from './src/context/AppContext';
import store from './src/store';
import { Provider as StoreProvider } from 'react-redux';


const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#3498db',
        accent: '#f1c40f',
    },
};

const Main = () => (
    <PaperProvider theme={theme}>
        <StoreProvider store={store}>
            <AppProvider>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </AppProvider>
        </StoreProvider>
    </PaperProvider>
);

AppRegistry.registerComponent(appName, () => Main);
