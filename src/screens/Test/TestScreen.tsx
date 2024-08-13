import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Test1 from './Test1';
import Test2 from './Test2';
import Test3 from './Test3';
import Test4 from './Test4';
import Test5 from './Test5';
import Test6 from './Test6';
const Tab = createMaterialTopTabNavigator();

const TestScreen = () => {
    return (
        <Tab.Navigator screenOptions={{
            tabBarScrollEnabled: true, // Enables horizontal scrolling
            tabBarLabelStyle: { fontSize: 12 }, // Adjust label size as needed
            tabBarItemStyle: { width: 100 }, // Each tab will have a fixed width
            tabBarStyle: { backgroundColor: '#fff' }, // Customize tab bar background color
            swipeEnabled: true, // Enable swipe navigation between tabs
        }}>
            <Tab.Screen name="Test1" component={Test1} />
            <Tab.Screen name="Test2" component={Test2} />
            <Tab.Screen name="Test3" component={Test3} />
            <Tab.Screen name="Test4" component={Test4} />
            <Tab.Screen name="Test5" component={Test5} />
            <Tab.Screen name="Test6" component={Test6} />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    parent: {
        flex: 1,
        height: 500,
        backgroundColor: 'red'
    }
});

export default TestScreen;
