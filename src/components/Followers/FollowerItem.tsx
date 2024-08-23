// FollowerItem.tsx
import React from 'react';
import { View, Text, Pressable, StyleSheet, GestureResponderEvent, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Colors from '../../styles/Colors';
import CustomButton from '../Ui/CustomButton';
import Fonts from '../../styles/Fonts';
import { useAuth } from '../../context/AuthContext';
import { API_URL } from '../../configure/config.android';


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

type FollowerType = {
    _id: string;
    userId: string;
    followerId: User;
    createdAt: string;
    isFollowing: boolean;
    __v: number;
};

interface FollowerItemProps {
    follower: FollowerType;
}

const FollowerItem: React.FC<FollowerItemProps> = ({ follower }) => {

    const { userDetail, user, appCounter } = useAuth();

    const onPressHandler = async (id: string) => {
        const followerId = id;
        const userId = userDetail._id;

        checkAlreadyFollowing(followerId);

        // try {
        //     const response = await fetch(`${API_URL}follow`, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Authorization': `Bearer ${user?.token}`,
        //         },
        //         body: JSON.stringify({
        //             "userId": userId,
        //             "followerId": followerId,
        //         }),
        //     });

        //     const result = await response.json();

        //     if (result.status === 'success') {
        //         Alert.alert('Successfully', 'Thank you for following.', [{ text: 'OK', onPress: () => appCounter() }]);
        //     } else {
        //         //
        //     }

        // } catch (error) {
        //     Alert.alert(`Error: ${error}`);
        // }

    };

    const checkAlreadyFollowing = async (id: string) => {
        const followerId = id;
        const userId = userDetail._id;

        try {

            const response = await fetch(`${API_URL}check-if-following`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.token}`,
                },
                body: JSON.stringify({
                    "userId": userId,
                    "followerId": followerId,
                }),
            });

            const result = await response.json();

            // console.log('');
            // console.log('');
            // console.log('');
            // console.log('');

            // console.log('Result', result);

            // if (result.status === 'success') {
            //     Alert.alert('Successfully', 'Thank you for following.', [{ text: 'OK', onPress: () => appCounter() }]);
            // } else {
            //
            // }

        } catch (error) {
            Alert.alert(`Error: ${error}`);
        }

    };

    return (
        <>

            <View style={styles.mainWrapper}>
                <View style={styles.container}>
                    <View style={styles.user}>
                        <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.gradient}>
                            <Icon name={'user-circle'} size={30} color={Colors.whiteColor} />
                        </LinearGradient>
                    </View>
                    <Text style={styles.name}>{follower.followerId?.firstname}</Text>
                </View>
                <View style={styles.rightWrapper}>

                    {follower.isFollowing &&
                        <Pressable style={styles.button} onPress={onPressHandler.bind(this, follower.followerId._id)}>
                            <Text style={styles.text}>Unfollow</Text>
                        </Pressable>
                    }

                    {!follower.isFollowing &&
                        <Pressable style={styles.button} onPress={onPressHandler.bind(this, follower.followerId._id)}>
                            <Text style={styles.text}>Follow</Text>
                        </Pressable>
                    }

                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    button: {
        display: 'flex',
        paddingVertical: 10,
        width: '100%',
        height: 40,
        backgroundColor: Colors.tabActiveColor,
        borderRadius: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    text: {
        fontSize: Fonts.Size.Medium - 1,
        color: Colors.blackColor,
        fontFamily: Fonts.Family.Bold
    },
    mainWrapper: {
        flex: 1,
        paddingVertical: 20,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: Colors.borderColor,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btnStyle: {
        paddingHorizontal: 15,
        height: 'auto',
        paddingVertical: 5
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    rightWrapper: {
        justifyContent: 'center'
    },
    profilePicture: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    name: {
        fontSize: 16,
        color: Colors.whiteColor,
        paddingLeft: 10
    },
    user: {
        width: 30
    },
    gradient: {
        borderRadius: 30
    },
});

export default React.memo(FollowerItem);
