import React from 'react';

import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Foundation from 'react-native-vector-icons/Foundation';
import AntDesign from 'react-native-vector-icons/AntDesign';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { StyleSheet, View } from 'react-native';



type TabOptions = {
    [key: string]: BottomTabNavigationOptions;
};

const TabNavigationOptions: TabOptions = {
    Home: {
        tabBarIcon: ({ color, size }) => (
            <Foundation name={'home'} size={size} color={color} />
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
            <AntDesign name={'star'} size={size} color={color} />
        ),
        tabBarLabel: ''
    },
    Profile: {
        tabBarIcon: ({ color, size }) => (
            <FontAwesome name={'user'} size={size} color={color} />
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
