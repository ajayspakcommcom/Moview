import * as React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import Colors from '../../styles/Colors';
import { useAuth } from '../../context/AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Fonts from '../../styles/Fonts';
import { capitalizeFirstLetter } from '../../utils/Common';
import { UserItem } from '../../types/User';
import CustomButton from '../Ui/CustomButton';
import { API_URL } from '../../configure/config.android';

type Props = {
    userData?: UserItem
};

const FollowerFollowing: React.FC<Props> = ({ userData }) => {

    const { userDetail, user, appCounter, counter } = useAuth();
    const [isFollowing, setIsFollowing] = React.useState(false);
    const [followData, setFollowData] = React.useState({ followers: 0, following: 0 });
    const [moviesReviewed, setMoviesReviewed] = React.useState(0);



    const abortController = new AbortController();
    const signal = abortController.signal;

    const getFollowerCount = async () => {

        const url = `${API_URL}follower/${userData?._id}`;
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
                setFollowData((prevState) => ({
                    ...prevState,
                    followers: result.data.length
                }));
            }
        } catch (error) {
            if (error instanceof Error) {
                if (error.name === 'AbortError') {

                } else {

                }
            } else {

            }
        }
    };

    const getFollowingCount = async () => {

        const url = `${API_URL}following/${userData?._id}`;
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
                setFollowData((prevState) => ({
                    ...prevState,
                    following: result.data.length
                }));
            }
        } catch (error) {
            if (error instanceof Error) {
                if (error.name === 'AbortError') {

                } else {

                }
            } else {

            }
        }
    };

    const checkIfFollowing = async () => {
        try {

            const response = await fetch(`${API_URL}check-if-following`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.token}`,
                },
                body: JSON.stringify({
                    "userId": userData?._id,
                    "followerId": userDetail?._id,
                }),
                signal: signal
            });

            const result = await response.json();

            if (result.status === 'success') {
                if (result.isFollowing === 1) {
                    setIsFollowing(true);
                }
            }

        } catch (error) {
            Alert.alert(`Error: ${error}`);
        }
    };

    const getReviewListByUser = async () => {

        const url = `${API_URL}review/user/${userData?._id}`;
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
                setMoviesReviewed(result.data.reviews.length);
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

        checkIfFollowing();
        getFollowerCount();
        getFollowingCount();
        getReviewListByUser();

        return () => {
            abortController.abort();
        };
    }, [userData]);

    const followHandler = async () => {
        try {

            const response = await fetch(`${API_URL}follow`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.token}`,
                },
                body: JSON.stringify({
                    "userId": userData?._id,
                    "followerId": userDetail?._id,
                }),
            });

            const result = await response.json();

            if (result.status === 'success') {
                Alert.alert('Successfully', 'Thank you for following.', [
                    {
                        text: 'OK', onPress: () => {
                            setIsFollowing(true);
                            appCounter();
                            getFollowerCount();
                        }
                    },
                ]);
            } else {
                // Alert.alert('Error', `${result.message}`, [
                //     { text: 'OK', onPress: () => { } }
                // ]);
            }


        } catch (error) {
            Alert.alert(`Error: ${error}`);
        }
    };

    const UnFollowHandler = async () => {

        try {

            const response = await fetch(`${API_URL}unfollow`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.token}`,
                },
                body: JSON.stringify({
                    "userId": userData?._id,
                    "followerId": userDetail?._id,
                }),
            });

            const result = await response.json();



            if (result.status === 'success') {
                Alert.alert('Successfully', 'Unfollow', [
                    {
                        text: 'OK', onPress: () => {
                            setIsFollowing(false);
                            appCounter();
                            setFollowData((prevState) => ({
                                ...prevState,
                                followers: followData.followers - 1
                            }));
                        }
                    },
                ]);
            } else {

            }


        } catch (error) {
            Alert.alert(`Error: ${error}`);
        }
    };

    return (
        <ScrollView style={styles.container}>

            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <View style={styles.userTextIcon}>
                        <View style={styles.userIcon}>
                            <Icon name={'user-alt'} size={40} color={Colors.tabBgColor} style={styles.icon} />
                        </View>
                        <View>
                            <Text style={styles.name}>{capitalizeFirstLetter(userData?.firstname as string)}</Text>
                            <Text style={styles.critic}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.followerWrapper}>
                <View style={styles.followers}>
                    <Text style={styles.follText}>{followData.followers}</Text>
                    <Text style={styles.follText}>Followers</Text>
                </View>
                <View style={styles.following}>
                    <Text style={styles.follText}>{followData.following}</Text>
                    <Text style={styles.follText}>Followings</Text>
                </View>
                <View style={styles.movies}>
                    <Text style={styles.follText}>{moviesReviewed}</Text>
                    <Text style={styles.follText}>Reviewed</Text>
                </View>
            </View>


            {!isFollowing &&
                <CustomButton
                    text={'Follow'}
                    onPressHandler={followHandler}
                    textSize={20}
                    isDisabled={false}
                />
            }

            {isFollowing &&
                <CustomButton
                    text={'Unfollow'}
                    onPressHandler={UnFollowHandler}
                    textSize={20}
                    isDisabled={false}
                />
            }

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15
    },
    header: {
        width: '100%',
        justifyContent: 'flex-start',
        alignContent: 'flex-start'
    },
    headerContent: {
        width: '100%'
    },
    userTextIcon: {
        flexDirection: 'row'
    },
    userIcon: {
        backgroundColor: Colors.whiteColor,
        width: 80,
        height: 80,
        borderRadius: 80,
        justifyContent: 'center',
        alignContent: 'center',
        marginRight: 15
    },
    name: {
        marginTop: 10,
        color: Colors.whiteColor,
        textAlign: 'left',
        fontFamily: Fonts.Family.Bold,
        fontSize: Fonts.Size.Medium + 2,
        lineHeight: 30
    },
    critic: {
        color: Colors.whiteColor,
        fontFamily: Fonts.Family.Medium,
        fontSize: Fonts.Size.Medium - 2,
        lineHeight: 18
    },
    icon: {
        textAlign: 'center',
        lineHeight: 80
    },
    followerWrapper: {
        width: '100%',
        flexDirection: 'row',
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    movies: {
        borderRightColor: Colors.whiteColor,
        paddingVertical: 15,

    },
    followers: {
        borderRightColor: Colors.whiteColor,
        paddingVertical: 15
    },
    following: {
        paddingVertical: 15,
        paddingHorizontal: 15
    },
    follText: {
        textAlign: 'center',
        fontFamily: Fonts.Family.Medium,
        fontSize: Fonts.Size.Medium,
        color: Colors.whiteColor
    }
});

export default React.memo(FollowerFollowing);
