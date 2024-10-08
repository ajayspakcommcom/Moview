import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../styles/Colors';
import { useAuth } from '../../context/AuthContext';
import { useFocusEffect } from '@react-navigation/native';

const MyNotification = React.lazy(() => import('../../components/MyNotification/HomeScreen'));
const Loading = React.lazy(() => import('../../components/Loading/Loading'));

import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store/index';
import { fetchNotificationsByUserId, deleteNotification } from '../../store/slices/notificationSlice';
import { API_URL } from '../../configure/config.android';

type Props = {
    navigation: any;
};

const Notification: React.FC<Props> = ({ navigation }) => {

    const { user, userDetail} = useAuth();
    const { data: notificationData } = useSelector((state: RootState) => state.notification);
    const dispatch = useAppDispatch();
    
    const url = `${API_URL}notification/follower/${userDetail._id}`;
    

    const backButtonHandler = () => {
        navigation.goBack();
    };

    const loadHeaderContent = () => {
        navigation.setOptions({
            title: `Notification`,
            headerLeft: () => {
                return <Icon name={'chevron-back'} size={30} color={Colors.whiteColor} onPress={backButtonHandler} />
            }
        });
    };

    const getNotificationData = () => {        
        loadHeaderContent();
        dispatch(fetchNotificationsByUserId({ url: url, token: user?.token! }));
    }

    const deleteNotificationHandler = async (id: string) => {                
        console.log('before notificationData', notificationData.length);
        const respData = await dispatch(deleteNotification({ url: `${API_URL}notification/${id}`, token: user?.token!, _id: id }));
        console.log('respData', respData);
        console.log('after notificationData', notificationData.length);
    }

    const notificationDataHandler = React.useCallback(() => {
        console.log('notificationData', notificationData.length);
    }, [notificationData]);

    useFocusEffect(
        React.useCallback(() => {
            getNotificationData();            
            return () => {            
            };
        }, []) 
    );

    return (
        <View style={styles.container}>          
            <React.Suspense fallback={<Loading />}>                
                {notificationData.length > 0 && <MyNotification notificationData={notificationData} onClick={deleteNotificationHandler} />}
                {notificationData.length === 0 && <View style={styles.noNotification}><Text style={styles.whiteText}>No Notifications</Text></View>}
            </React.Suspense>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        position: 'relative',
        flexDirection: 'row',
        marginBottom: 15,
        flexGrow: 1
    },
    noNotification: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    whiteText: {
        color: Colors.whiteColor,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold'
    }

});

export default Notification;
