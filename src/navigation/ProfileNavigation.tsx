import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import Colors from '../styles/Colors';
import HomeScreen from '../screens/Profile/HomeScreen';
import { TextAlign } from '../styles/TextAlignmentUtils';
import TestScreen from '../screens/Test/TestScreen-23-08-2024';
import Follower from '../screens/Profile/Follower';
import Following from '../screens/Profile/Following';
import Notification from '../screens/Notification/HomeScreen';

const Stack = createNativeStackNavigator();

const ProfileNavigation: React.FC = () => {

    const navigatorOptions: NativeStackNavigationOptions = {
        headerShown: false,
        headerStyle: { backgroundColor: Colors.blackColor },
        headerTintColor: Colors.whiteColor,
        headerTitleAlign: TextAlign.Center,
        contentStyle: { backgroundColor: Colors.darkBackgroudColor }
    };

    const screenOptions: NativeStackNavigationOptions = {
        contentStyle: { backgroundColor: Colors.darkBackgroudColor },
        animation: 'slide_from_right'
    };

    return (
        <Stack.Navigator screenOptions={navigatorOptions}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ ...screenOptions }} />
            <Stack.Screen name="FollowerScreen" component={Follower} options={{ ...screenOptions, headerShown: true }} />
            <Stack.Screen name="FollowingScreen" component={Following} options={{ ...screenOptions, headerShown: true }} />
            <Stack.Screen name="Notification" component={Notification} options={{ ...screenOptions, headerShown: true }} />
            <Stack.Screen name="TestScreen" component={TestScreen} options={{ ...screenOptions }} />
        </Stack.Navigator>
    );
};

export default ProfileNavigation;
