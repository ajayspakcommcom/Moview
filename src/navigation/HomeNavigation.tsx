import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import Colors from '../styles/Colors';
import HomeScreen from '../screens/Home/HomeScreen';

const Stack = createNativeStackNavigator();

const HomeNavigation: React.FC = () => {

    const navigatorOptions: NativeStackNavigationOptions = {
        headerShown: false,
        headerStyle: { backgroundColor: Colors.blackColor },
        headerTintColor: 'red',
        headerTitleAlign: 'left',
        contentStyle: { backgroundColor: Colors.darkBackgroudColor }
    };

    const screenOptions: NativeStackNavigationOptions = {
        contentStyle: { backgroundColor: Colors.darkBackgroudColor }
    };

    return (
        <Stack.Navigator screenOptions={navigatorOptions}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ ...screenOptions }} />
        </Stack.Navigator>
    );
};

export default HomeNavigation;
