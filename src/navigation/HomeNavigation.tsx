import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import Colors from '../styles/Colors';
import HomeScreen from '../screens/Home/HomeScreen';
import DetailScreen from '../screens/Home/DetailScreen';
import { TextAlign } from '../styles/TextAlignmentUtils';
import FollowerFollowingScreen from '../screens/Home/FollowerFollowingScreen';
import Notification from '../screens/Notification/HomeScreen';
import ShowDetailScreen from '../screens/Home/ShowDetailScreen';



const Stack = createNativeStackNavigator();

const HomeNavigation: React.FC = () => {

    const navigatorOptions: NativeStackNavigationOptions = {
        headerShown: false,
        headerStyle: { backgroundColor: Colors.blackColor },
        headerTintColor: Colors.whiteColor,
        headerTitleAlign: TextAlign.Center,
        contentStyle: { backgroundColor: Colors.darkBackgroudColor }
    };

    const screenOptions: NativeStackNavigationOptions = {
        contentStyle: { backgroundColor: Colors.darkBackgroudColor },
        animation: 'fade'
    };

    return (
        <Stack.Navigator screenOptions={navigatorOptions} initialRouteName='HomeScreen'>            
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ ...screenOptions, headerShown: false  }} />
            <Stack.Screen name="DetailScreen" component={DetailScreen} options={{ ...screenOptions, headerShown: true }} />
            <Stack.Screen name="FollowerFollowing" component={FollowerFollowingScreen} options={{ ...screenOptions, headerShown: true }} />
            <Stack.Screen name="Notification" component={Notification} options={{ ...screenOptions, headerShown: true }} />
            <Stack.Screen name="ShowDetail" component={ShowDetailScreen} options={{ ...screenOptions, headerShown: true }} />
        </Stack.Navigator>
    );
};

export default HomeNavigation;
