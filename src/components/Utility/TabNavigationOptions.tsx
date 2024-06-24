import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';


type TabOptions = {
    [key: string]: BottomTabNavigationOptions;
};

const TabNavigationOptions: TabOptions = {
    Home: {
        tabBarIcon: ({ color, size }) => (
            <FontAwesome name={'home'} size={size} color={color} />
        ),
    },
    Search: {
        tabBarIcon: ({ color, size }) => (
            <FontAwesome name={'search'} size={size} color={color} />
        ),
    },
    Setting: {
        tabBarIcon: ({ color, size }) => (
            <Icon name={'settings'} size={size} color={color} />
        ),
    },
    Profile: {
        tabBarIcon: ({ color, size }) => (
            <FontAwesome name={'user-circle'} size={size} color={color} />
        ),
    },

};

export default TabNavigationOptions;
