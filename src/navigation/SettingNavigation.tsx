import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import Colors from '../styles/Colors';
import HomeScreen from '../screens/Setting/HomeScreen';
import DetailScreen from '../screens/Setting/DetailScreen';
import { TextAlign } from '../styles/TextAlignmentUtils';

const Stack = createNativeStackNavigator();

const SettingNavigation: React.FC = () => {

    const navigatorOptions: NativeStackNavigationOptions = {
        headerShown: false,
        headerStyle: { backgroundColor: Colors.blackColor },
        headerTintColor: Colors.whiteColor,
        headerTitleAlign: TextAlign.Center,
        contentStyle: { backgroundColor: Colors.darkBackgroudColor }
    };

    const screenOptions: NativeStackNavigationOptions = {
        contentStyle: { backgroundColor: Colors.darkBackgroudColor }
    };

    return (
        <Stack.Navigator screenOptions={navigatorOptions}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ ...screenOptions }} />
            <Stack.Screen name="DetailScreen" component={DetailScreen} options={{ ...screenOptions, headerShown: true }} />
        </Stack.Navigator>
    );
};

export default SettingNavigation;
