// FollowerItem.tsx
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Colors from '../../styles/Colors';
import CustomButton from '../Ui/CustomButton';


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
    __v: number;
};

interface FollowerItemProps {
    follower: FollowerType;
}

const FollowerItem: React.FC<FollowerItemProps> = ({ follower }) => {
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
                    <CustomButton text='Follow' style={styles.btnStyle} />
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
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
