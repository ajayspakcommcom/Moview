import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { API_URL } from '../../configure/config.android';
import { Text } from 'react-native-paper';
import { Button } from 'react-native-paper';

import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store/index';
import { createReviewListByMovie, fetchReviewListByMovie } from '../../store/slices/reviewListByMoviewSlice';
import { useAuth } from '../../context/AuthContext';
import { fetchNotifications, createNotification } from '../../store/slices/notificationSlice';
import { fetchReviewListByShow,createReviewListByShow } from '../../store/slices/reviewListByShowSlice';
import Fonts from '../../styles/Fonts';
import Colors from '../../styles/Colors';




const TestScreen = () => {

    const { user, userDetail } = useAuth();

    const { data: notificationData } = useSelector((state: RootState) => state.notification);  
    const dispatch = useAppDispatch();

    const addNotificationHandler = async () => {        
       dispatch(createNotification({ url: `${API_URL}notification`, token: user?.token!, user_id: userDetail._id, title: 'hariom', message: 'app', type: 'show' }));       
    };

    const fetchNotificationHandler =  () => {        
        dispatch(fetchNotifications({ url: `${API_URL}notification`, token: user?.token! }));
    };

    
    return (
        <ScrollView style={styles.container}>            
            <Text style={styles.heading}>Test</Text>    
            <Text style={styles.whiteText}>{notificationData.length}</Text>
            <Text style={{ color: 'white' }}>{JSON.stringify(notificationData)}</Text>
            <View style={styles.centerBtn}>
                <Button mode='contained' onPress={() => fetchNotificationHandler()}>Fetch Notification Button</Button>
                <Button mode='contained' onPress={() => addNotificationHandler()}>Add Notification Button</Button>
            </View>        
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#021526'
    },
    whiteText: {
        color: Colors.whiteColor
    },
    heading: {
        fontFamily:Fonts.Family.Bold,
        fontSize:Fonts.Size.XXX_Large,
        color:Colors.whiteColor
    },
    centerBtn: {
        flexDirection: 'row',
        justifyContent: 'center'
    }
});

export default TestScreen;
