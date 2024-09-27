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

    const { user } = useAuth();

     const { data: reviewListByShow } = useSelector((state: RootState) => state.reviewListByShow);  
    const dispatch = useAppDispatch();

    const addReviewHandler =  async () => {
        const createdReview = await dispatch(createReviewListByShow({ url: `${API_URL}review-show`, token: user?.token!, show: '66c08bfb763c6c06a7372276', user: '66a368f4470675a3aa79ccb4', rating: 5, comment: 'api sujeet' }));           
        console.log('createdReview', createdReview);
    };

    const fetchReviewHandler =  () => {        
        dispatch(fetchReviewListByShow({ url: `${API_URL}review-show/show/66c08bfb763c6c06a7372276`, token: user?.token! }));
    };

    
    return (
        <ScrollView style={styles.container}>            
            <Text style={styles.heading}>Test</Text>    
            <Text style={styles.whiteText}>{reviewListByShow.length}</Text>
            <Text style={{ color: 'white' }}>{JSON.stringify(reviewListByShow)}</Text>
            <View style={styles.centerBtn}>
                <Button mode='contained' onPress={() => fetchReviewHandler()}>Fetch Review Button</Button>
                <Button mode='contained' onPress={() => addReviewHandler()}>Add Button</Button>
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
