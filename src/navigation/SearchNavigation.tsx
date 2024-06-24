import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import Colors from '../styles/Colors';
import HomeScreen from '../screens/Search/HomeScreen';

const Stack = createNativeStackNavigator();

const SearchNavigation: React.FC = () => {

    const screenOptions: NativeStackNavigationOptions = {
        headerShown: false,
        headerStyle: { backgroundColor: Colors.blackColor },
        headerTintColor: 'white',
        headerTitleAlign: 'left',
        contentStyle: { backgroundColor: Colors.darkBackgroudColor }
    };

    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
        </Stack.Navigator>
    );
};

export default SearchNavigation;
