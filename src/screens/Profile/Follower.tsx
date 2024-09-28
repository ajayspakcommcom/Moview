import * as React from 'react';
import { View, StyleSheet, } from 'react-native';
import { Text } from 'react-native-paper';

import Icon from 'react-native-vector-icons/Ionicons';

import FollowerList from '../../components/Followers/FollowerList';
import Colors from '../../styles/Colors';
import { API_URL } from '../../configure/config.android';
import { useAuth } from '../../context/AuthContext';
import { FollowerType } from '../../models/Follower';


type Props = {
    navigation: any;
    route: any;
};


const Follower: React.FC<Props> = ({ navigation, route }) => {

    const { user, userDetail, counter } = useAuth();
    const [followerData, setFollowerData] = React.useState<FollowerType[]>([]);

    const abortController = new AbortController();
    const signal = abortController.signal;

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

            const result = await response.json();

            if (result.status === 'success') {
                setFollowerData(result.data)
            }

        } catch (error) {
            if (error instanceof Error) {
                if (error.name === 'AbortError') {
                    //
                }
            }
        }
    };

    React.useLayoutEffect(() => {

        headerHandler();
        getFollowerList();

        return () => {

        }

    }, [counter]);


    return (
        <>
            <FollowerList followers={followerData} />
        </>
    );
};

const styles = StyleSheet.create({
   
});

export default React.memo(Follower);
