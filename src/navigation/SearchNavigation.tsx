import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import Colors from '../styles/Colors';
import HomeScreen from '../screens/Search/HomeScreen';

const Stack = createNativeStackNavigator();

const SearchNavigation: React.FC = () => {

    const navigatorOptions: NativeStackNavigationOptions = {
        headerShown: false,
        headerStyle: { backgroundColor: Colors.blackColor },
        headerTintColor: 'white',
        headerTitleAlign: 'left',
        contentStyle: { backgroundColor: Colors.darkBackgroudColor }
    };

    const screenOptions: NativeStackNavigationOptions = {
        contentStyle: { backgroundColor: Colors.darkBackgroudColor },
        animation: 'slide_from_left'
    };

    return (
        <Stack.Navigator screenOptions={navigatorOptions}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ ...screenOptions }} />
        </Stack.Navigator>
    );
};

export default SearchNavigation;
