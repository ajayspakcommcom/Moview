import * as React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, PressableProps, Alert } from 'react-native';
import Colors from '../../styles/Colors';
import { useRoute, useNavigation, ParamListBase, NavigationProp, RouteProp } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Fonts from '../../styles/Fonts';
import { capitalizeFirstLetter } from '../../utils/Common';
import { UserItem } from '../../types/User';
import CustomButton from '../Ui/CustomButton';
import { API_URL } from '../../configure/config.android';

type Props = {
    userData?: UserItem
};

const FollowerFollowing: React.FC<Props> = ({ userData }) => {

    const { userDetail, user } = useAuth();
    const [isFollowing, setIsFollowing] = React.useState(false);
    const abortController = new AbortController();
    const signal = abortController.signal;

    React.useLayoutEffect(() => {


        // console.log('userId', userData?._id);
        // console.log('followerId', userDetail?._id);

        //console.log('userDetail', (userDetail as UserItem).following);

        //console.log((userDetail as UserItem).following.includes(userData?._id));
        //setIsFollowing((userDetail as UserItem).following.includes(userData?._id));

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
                console.log(result);

                if (result.status === 'success') {
                    if (result.isFollowing === 1) {
                        setIsFollowing(true);
                    }
                }

            } catch (error) {
                Alert.alert(`Error: ${error}`);
            }
        };

        checkIfFollowing();

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
                Alert.alert('Successfully', 'Thank you for unfollowing.', [
                    {
                        text: 'OK', onPress: () => {
                            setIsFollowing(false);
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
                    <Text style={styles.follText}>{0}</Text>
                    <Text style={styles.follText}>Followers</Text>
                </View>
                <View style={styles.following}>
                    <Text style={styles.follText}>{0}</Text>
                    <Text style={styles.follText}>Following</Text>
                </View>
                <View style={styles.movies}>
                    <Text style={styles.follText}>200</Text>
                    <Text style={styles.follText}>Movies Reviewed</Text>
                </View>
            </View>

            <Text>{isFollowing ? 'Following' : 'No Following'}</Text>

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
