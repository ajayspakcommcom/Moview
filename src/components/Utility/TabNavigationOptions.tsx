import React from 'react';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import AntDesign from 'react-native-vector-icons/AntDesign';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

type TabOptions = {
    [key: string]: BottomTabNavigationOptions;
};

const TabNavigationOptions: TabOptions = {
    Home: {
        tabBarIcon: ({ focused, color, size }) => (
            <Foundation name={focused ? 'home' : 'home'} size={20} color={color} />
        ),
        tabBarLabel: ''
    },
    Search: {
        tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome name={focused ? 'search' : 'search'} size={20} color={color} />
        ),
        tabBarLabel: ''
    },
    MyReview: {
        tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name={focused ? 'star' : 'star'} size={20} color={color} />
        ),
        tabBarLabel: ''
    },
    Profile: {
        tabBarIcon: ({ focused, color, size = 30 }) => (
            <FontAwesome name={focused ? 'user' : 'user'} size={18} color={color} />
        ),
        tabBarLabel: ''
    },


};

const styles = StyleSheet.create({
    logo: {
        width: 30,
        height: 30,
        color: 'red'
    }
});

export default TabNavigationOptions;
