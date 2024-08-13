import * as React from 'react';
import { View, Text, StyleSheet, Button, ScrollView, ImageSourcePropType, Image, TextInput } from 'react-native';
import { useRoute, useNavigation, ParamListBase, NavigationProp, RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../styles/Colors';
import { MovieItem } from '../../types/Movie';
import { findMovieById } from '../../utils/Common';
import { MovieDataList } from '../../utils/Data';
import Fonts from '../../styles/Fonts';
import { Rating, AirbnbRating } from 'react-native-ratings';
import CustomButton from '../../components/Ui/CustomButton';
import FastImage from 'react-native-fast-image';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from '../../context/AuthContext';
import { API_URL } from '../../configure/config.android';
import { UserItem } from '../../types/User';
import FollowerFollowing from '../../components/FollowerFollowing/FollowerFollowing';

type Props = {
    navigation: StackNavigationProp<any>;
    route: any;
};



const FollowerFollowingScreen: React.FC<Props> = ({ navigation, route }) => {

    const userId = route.params.userId;
    const abortController = new AbortController();
    const signal = abortController.signal;
    const [userDetail, setUserDetail] = React.useState<UserItem>();

    const { user } = useAuth();


    React.useLayoutEffect(() => {

        navigation.setOptions({
            title: ``
        });

        const fetchUserDetail = async () => {

            const url = `${API_URL}user/${userId}`;
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
                    setUserDetail(result.data.user)
                }
            } catch (error) {
                if (error instanceof Error) {
                    if (error.name === 'AbortError') {

                    } else {

                    }
                } else {

                }
                throw error; //Re-throw the error to be handled by the caller if necessary
            }
        };

        fetchUserDetail();

        return () => {
            abortController.abort();
        };
    }, []);

    return (
        <>
            <FollowerFollowing userData={userDetail} />
        </>
    );
};


const styles = StyleSheet.create({
});


export default FollowerFollowingScreen;
