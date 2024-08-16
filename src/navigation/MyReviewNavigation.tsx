import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import Colors from '../styles/Colors';
import HomeScreen from '../screens/MyReview/HomeScreen';
import { TextAlign } from '../styles/TextAlignmentUtils';
import Notification from '../screens/Notification/HomeScreen';

const Stack = createNativeStackNavigator();

const MyReviewNavigation: React.FC = () => {

    const navigatorOptions: NativeStackNavigationOptions = {
        headerShown: false,
        headerStyle: { backgroundColor: Colors.blackColor },
        headerTintColor: Colors.whiteColor,
        headerTitleAlign: TextAlign.Center,
        contentStyle: { backgroundColor: Colors.darkBackgroudColor },
    };

    const screenOptions: NativeStackNavigationOptions = {
        contentStyle: { backgroundColor: Colors.darkBackgroudColor },
        animation: 'slide_from_left'
    };

    return (
        <Stack.Navigator screenOptions={navigatorOptions}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ ...screenOptions, headerShown: false, }} />
            <Stack.Screen name="Notification" component={Notification} options={{ ...screenOptions, headerShown: true }} />
        </Stack.Navigator>
    );
};

export default MyReviewNavigation;
