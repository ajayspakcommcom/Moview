import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';


type TabOptions = {
    [key: string]: BottomTabNavigationOptions;
};

const TabNavigationOptions: TabOptions = {
    Home: {
        tabBarIcon: ({ color, size }) => (
            <FontAwesome name={'home'} size={size} color={color} />
        ),
        tabBarLabel: ''
    },
    Search: {
        tabBarIcon: ({ color, size }) => (
            <FontAwesome name={'search'} size={size} color={color} />
        ),
        tabBarLabel: ''
    },
    MyReview: {
        tabBarIcon: ({ color, size }) => (
            <MaterialIcons name={'reviews'} size={size} color={color} />
        ),
        tabBarLabel: ''
    },
    Profile: {
        tabBarIcon: ({ color, size }) => (
            <FontAwesome name={'user-circle'} size={size} color={color} />
        ),
        tabBarLabel: ''
    },

};

export default TabNavigationOptions;
