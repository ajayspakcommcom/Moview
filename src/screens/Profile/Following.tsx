import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import FollowingList from '../../components/Followings/FollowingList';
import Colors from '../../styles/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../../context/AuthContext';
import { API_URL } from '../../configure/config.android';


type Props = {
    navigation: any;
    route: any;
};

type User = {
    _id: string;
    firstname: string;
    username: string;
    email: string;
    phone: string;
    password_hash: string;
    is_deleted: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    __v: number;
};

type FollowingType = {
    _id: string;
    userId: string;
    // followingId: User;
    followerId: User;
    createdAt: string;
    __v: number;
};


const Following: React.FC<Props> = ({ navigation, route }) => {

    const { user, userDetail, counter } = useAuth();

    const [followingData, setFollowingData] = React.useState<FollowingType[]>([]);

    const abortController = new AbortController();
    const signal = abortController.signal;

    const backButtonHandler = () => {
        navigation.navigate('HomeScreen');
    };



    const getFollowingList = async () => {

        const url = `${API_URL}follower/${userDetail._id}`;
        const token = user;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token?.token}`,
                    'Content-Type': 'application/json'
                },
                signal: signal
            });

            const respData = await response.json();

            if (respData.status === 'success') {
                setFollowingData(respData.data);
            }

        } catch (error) {
            if (error instanceof Error) {
                if (error.name === 'AbortError') {
                    //
                }
            }
        }
    };

    const headerHandler = () => {
        navigation.setOptions({
            title: `Followings`,
            headerLeft: () => {
                return <Icon name={'chevron-back'} size={30} color={Colors.whiteColor} onPress={backButtonHandler} />
            },
            headerRight: () => {
                return '' //<Icon name={'notifications'} size={25} color={Colors.tabActiveColor} />
            }
        });
    };


    React.useLayoutEffect(() => {

        headerHandler();
        getFollowingList();

        console.log('counter increamented', counter);

        return () => {

        }
    }, [counter]);



    return (
        <>
            <FollowingList following={followingData} />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

});

export default React.memo(Following);
