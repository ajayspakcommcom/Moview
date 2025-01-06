import * as React from 'react';
import { View, StyleSheet, Pressable, Platform } from 'react-native';
import FollowerList from '../../components/Followers/FollowerList';
import Colors from '../../styles/Colors';
import { API_URL } from '../../configure/config.android';
import { useAuth } from '../../context/AuthContext';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store/index';
import { fetchFollowers } from '../../store/slices/followerSlice';
import { Text } from 'react-native-paper';
import FastImage from 'react-native-fast-image';

type Props = {
    navigation: any;
    route: any;
};


const Follower: React.FC<Props> = ({ navigation, route }) => {

    const { user, userDetail } = useAuth();
    const { data: followerData } = useSelector((state: RootState) => state.myFollower);         
    const dispatch = useAppDispatch();

    const backButtonHandler = () => {
        navigation.navigate('HomeScreen');
    };

    const headerHandler = () => {
        navigation.setOptions({
            title: `Followers`,
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
                return `` //<Icon name={'notifications'} size={25} color={Colors.tabActiveColor} />
            }
        });
    };

    const getFollowerList = async () => {
        dispatch(fetchFollowers({ url: `${API_URL}follower/${userDetail._id}`, token: user?.token! }));        
    };

    React.useLayoutEffect(() => {

        headerHandler();
        getFollowerList();

        return () => {

        }

    }, []);


    return ( 
        <>
            {followerData.length > 0 && <FollowerList followers={followerData} />}
            {followerData.length === 0 &&
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
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
   text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.whiteColor
   }
});

export default React.memo(Follower);
