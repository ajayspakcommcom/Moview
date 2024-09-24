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

    const deleteNotificationHandler = (id: string) => {
        dispatch(deleteNotification({ url: url, token: user?.token!, _id: id }));
        getNotificationData();
    }

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
                <MyNotification notificationData={notificationData} onClick={deleteNotificationHandler} />
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
    }

});

export default Notification;
