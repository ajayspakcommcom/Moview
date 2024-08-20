// FollowerItem.tsx
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Colors from '../../styles/Colors';


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
    followingId: User;
    createdAt: string;
    __v: number;
};
interface FollowingItemProps {
    following: FollowingType;
}

const FollowingItem: React.FC<FollowingItemProps> = ({ following }) => {
    return (
        <View style={styles.container}>
            {/* <Image source={{ uri: following.profilePicture }} style={styles.profilePicture} /> */}
            <View style={styles.user}>
                <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.gradient}>
                    <Icon name={'user-circle'} size={30} color={Colors.whiteColor} />
                </LinearGradient>
            </View>
            <Text style={styles.name}>{following.followingId?.firstname}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
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

export default React.memo(FollowingItem);
