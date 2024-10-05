import * as React from 'react';
import { View, StyleSheet, } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FollowerList from '../../components/Followers/FollowerList';
import Colors from '../../styles/Colors';
import { API_URL } from '../../configure/config.android';
import { useAuth } from '../../context/AuthContext';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store/index';
import { fetchFollowers } from '../../store/slices/followerSlice';
import { Text } from 'react-native-paper';

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
                return <Icon name={'chevron-back'} size={30} color={Colors.whiteColor} onPress={backButtonHandler} />
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
   text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.whiteColor
   }
});

export default React.memo(Follower);
