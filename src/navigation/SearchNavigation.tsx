import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import Colors from '../styles/Colors';
import HomeScreen from '../screens/Search/HomeScreen';
import Notification from '../screens/Notification/HomeScreen';
import DetailScreen from '../screens/Search/DetailScreen';
import FollowerFollowingScreen from '../screens/Search/FollowerFollowingScreen';
import ShowDetailScreen from '../screens/Search/ShowDetailScreen';

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
        animation: 'fade'
    };

    return (
        <Stack.Navigator screenOptions={navigatorOptions}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ ...screenOptions }} />
            <Stack.Screen name="DetailScreen" component={DetailScreen} options={{ ...screenOptions, headerShown: true }} />
            <Stack.Screen name="FollowerFollowing" component={FollowerFollowingScreen} options={{ ...screenOptions, headerShown: true }} />
            <Stack.Screen name="Notification" component={Notification} options={{ ...screenOptions, headerShown: true }} />
            <Stack.Screen name="ShowDetail" component={ShowDetailScreen} options={{ ...screenOptions, headerShown: true }} />
        </Stack.Navigator>
    );
};

export default SearchNavigation;
