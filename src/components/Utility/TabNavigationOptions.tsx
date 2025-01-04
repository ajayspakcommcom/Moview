import React from 'react';

import FastImage from 'react-native-fast-image';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import AntDesign from 'react-native-vector-icons/AntDesign';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { Platform, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

type TabOptions = {
    [key: string]: BottomTabNavigationOptions;
};

const TabNavigationOptions: TabOptions = {
    Home: {
        tabBarIcon: ({ focused, color, size }) => (
            <> 
               {/* {Platform.OS === "android" && <Foundation name={focused ? 'home' : 'home'} size={22} color={color} />}
               {(Platform.OS === "ios" && !focused) && <FastImage style={styles.icon} source={require(`../../assets/images/icons/home-w.png`)} />}
               {(Platform.OS === "ios" && focused) && <FastImage style={styles.icon} source={require(`../../assets/images/icons/home-y.png`)} />} */}

               
               {!focused && <FastImage style={styles.icon} source={require(`../../assets/images/icons/home-w.png`)} />}
               {focused && <FastImage style={styles.icon} source={require(`../../assets/images/icons/home-y.png`)} />}
            </>
        ),
        tabBarLabel: ''
    },
    Search: {
        tabBarIcon: ({ focused, color, size }) => (
            <>
              {/* {Platform.OS === 'android' && <FontAwesome name={focused ? 'search' : 'search'} size={20} color={color} />}
              {(Platform.OS === "ios" && !focused) && <FastImage style={styles.icon} source={require('../../assets/images/icons/search-w.png')} />}
              {(Platform.OS === "ios" && focused) && <FastImage style={styles.icon} source={require('../../assets/images/icons/search-y.png')} />} */}

              
              {!focused && <FastImage style={styles.icon} source={require('../../assets/images/icons/search-w.png')} />}
              {focused && <FastImage style={styles.icon} source={require('../../assets/images/icons/search-y.png')} />}
            </>
        ),
        tabBarLabel: ''
    },
    MyReview: {
        tabBarIcon: ({ focused, color, size }) => (
            <>
             {/* {Platform.OS === "android" && <AntDesign name={focused ? 'star' : 'star'} size={20} color={color} />}
             {(Platform.OS === "ios" && !focused) && <FastImage style={styles.icon} source={require('../../assets/images/icons/my-review-w.png')} />}
             {(Platform.OS === "ios" && focused) && <FastImage style={styles.icon} source={require('../../assets/images/icons/my-review-y.png')} />} */}

             
             {!focused && <FastImage style={styles.icon} source={require('../../assets/images/icons/my-review-w.png')} />}
             {focused && <FastImage style={styles.icon} source={require('../../assets/images/icons/my-review-y.png')} />}
            </>
        ),
        tabBarLabel: ''
    },
    Profile: {
        tabBarIcon: ({ focused, color, size = 30 }) => (
            <>
             {/* {Platform.OS === "android" &&  <FontAwesome name={focused ? 'user' : 'user'} size={20} color={color} />}
             {(Platform.OS === "ios" && !focused) && <FastImage style={styles.icon} source={require('../../assets/images/icons/profile-w.png')} />}
             {(Platform.OS === "ios" && focused) && <FastImage style={styles.icon} source={require('../../assets/images/icons/profile-y.png')} />} */}

             
             {!focused && <FastImage style={styles.icon} source={require('../../assets/images/icons/profile-w.png')} />}
             {focused && <FastImage style={styles.icon} source={require('../../assets/images/icons/profile-y.png')} />}
            </>
            
        ),
        tabBarLabel: ''
    },


};

const styles = StyleSheet.create({
    icon: {
        width:25, 
        height:25
    },
    logo: {
        width: 30,
        height: 30,
        color: 'red'
    }
});

export default TabNavigationOptions;
