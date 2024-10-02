import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { API_URL } from '../../configure/config.android';
import { Text } from 'react-native-paper';
import { Button } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store/index';
import { useAuth } from '../../context/AuthContext';
import Fonts from '../../styles/Fonts';
import Colors from '../../styles/Colors';
import { createFollower, fetchFollowers } from '../../store/slices/followerSlice';

const TestScreen = () => {

    const { user, userDetail } = useAuth();
    const { data: followerData, error } = useSelector((state: RootState) => state.myFollower);  
    
    const dispatch = useAppDispatch();

    const addFollowerHandler = async () => {          
       dispatch(createFollower({ url: `${API_URL}follow`, token: user?.token!, userId: '66a368f4470675a3aa79ccb4', followerId:userDetail._id }));       
    };

    const fetchFollowerHandler =  () => {                
        dispatch(fetchFollowers({ url: `${API_URL}follower/${userDetail._id}`, token: user?.token! }));
    };

    const checkStateHandler = () => {
        console.log('followerData', followerData);
    }


   


    
    return (
        <ScrollView style={styles.container}>                 
            <Text style={styles.heading}>Test</Text>  
                <Text style={styles.whiteText}>{error}</Text>
                <Text style={styles.whiteText}> State : {JSON.stringify(followerData)}</Text>
                <Text style={styles.whiteText}> Json :  {JSON.stringify(followerData)}</Text>
                <Text style={styles.whiteText}> Json :  {JSON.stringify(followerData)}</Text>
                <View style={styles.centerBtn}>
                    <Button style={styles.btn} mode='contained' onPress={() => checkStateHandler()}>Check State Button</Button>
                    <Button style={styles.btn} mode='contained' onPress={() => fetchFollowerHandler()}>Fetch Follower Button</Button>
                    <Button style={styles.btn} mode='contained' onPress={() => addFollowerHandler()}>Add Follower Button</Button>                    
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
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    btn: {
        margin: 10
    }
});

export default TestScreen;
