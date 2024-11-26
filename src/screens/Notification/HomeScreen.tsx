import * as React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
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
import Fonts from '../../styles/Fonts';
import CustomButton from '../../components/Ui/CustomButton';

type Props = {
    navigation: any;
};

const Notification: React.FC<Props> = ({ navigation }) => {

    const { user, userDetail, logout} = useAuth();
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
        const respData = await dispatch(deleteNotification({ url: `${API_URL}notification/${id}`, token: user?.token!, _id: id }));
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

    const navigationHandler = () => {
        logout();
    };

    return (
      <View style={styles.container}>
        {userDetail.role !== 'guest' && (
          <React.Suspense fallback={<Loading />}>
            {notificationData.length > 0 && <MyNotification notificationData={notificationData} onClick={deleteNotificationHandler} />}
            {notificationData.length === 0 && (
              <View style={styles.noNotification}>
                <Text style={styles.whiteText}>No Notifications</Text>
              </View>
            )}
          </React.Suspense>
        )}

        {userDetail.role === 'guest' && (
          <View style={styles.withoutLoginWrapper}>           
            <CustomButton text={'Please Login'} onPressHandler={navigationHandler} textSize={20} />
          </View>
        )}
      </View>
    );
};

const styles = StyleSheet.create({
    withoutLoginWrapper: {
        flex: 1,        
        justifyContent:'center', 
        alignItems:'center', 
        paddingHorizontal:15        
    },     
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
        fontSize:Fonts.Size.Medium + 2,
        fontWeight: 'bold'
    }

});

export default Notification;
