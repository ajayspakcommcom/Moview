import * as React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import FollowingList from '../../components/Followings/FollowingList';
import Colors from '../../styles/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../../context/AuthContext';
import { API_URL } from '../../configure/config.ios';
import Fonts from '../../styles/Fonts';
import { RootState, useAppDispatch } from '../../store/index';
import { useSelector } from 'react-redux';
import { fetchFollowings } from '../../store/slices/followingSlice';
import FastImage from 'react-native-fast-image';
import { Platform } from 'react-native';


type Props = {
    navigation: any;
    route: any;
};


const Following: React.FC<Props> = ({ navigation, route }) => {

    const { user, userDetail } = useAuth();

    const { data: followingData } = useSelector((state: RootState) => state.myFollowing);         
    const dispatch = useAppDispatch();

    const backButtonHandler = () => {
        navigation.navigate('HomeScreen');
    };

    const getFollowingList = async () => {
        dispatch(fetchFollowings({ url: `${API_URL}following/${userDetail._id}`, token: user?.token! }));        
    };

    const headerHandler = () => {
        navigation.setOptions({
            title: `Followings`,
            headerLeft: () => {
                return  <Pressable onPress={backButtonHandler}>
                {Platform.OS === 'android' && <FastImage style={styles.backBtn} source={require('../../assets/images/icons/back-w.png')} />}
                {Platform.OS === 'ios' && <View style={styles.iosBackBtnWrapper}>
                        <FastImage style={[styles.iosBackBtnImg]}  source={require('../../assets/images/icons/back-w-1.png')} />
                        <Text style={[styles.iosBackBtnText]}>  Back</Text>  
                    </View>}
            </Pressable>
            },
            headerRight: () => {
                return '' //<Icon name={'notifications'} size={25} color={Colors.tabActiveColor} />
            }
        });
    };

    React.useLayoutEffect(() => {
        headerHandler();
        getFollowingList();

        return () => {}
    }, [followingData]);


    return (
        <>            
            {followingData.length > 0 && <FollowingList following={followingData} />}
            {
                followingData.length === 0 &&
                <View style={styles.container}>
                        <Text style={styles.text}>No data found</Text>
                </View>
            }            
        </>
    );
};

const styles = StyleSheet.create({
    iosBackBtnText: {
        color:Colors.whiteColor
    },
    iosBackBtnWrapper: {
        flexDirection:'row', 
        alignItems:'center'
    },
    iosBackBtnImg: {
        width:8, 
        height:15,             
    },
    backBtn: {
        width:35, 
        height:35, 
        marginBottom:20
    },  
    container: {
        flex: 1,
        justifyContent: 'center',
    },

    text: {
        fontSize: Fonts.Size.Medium,
        fontFamily: Fonts.Family.Bold,
        color: Colors.whiteColor,
        textAlign: 'center',
        marginTop: 20
    }
});

export default React.memo(Following);
