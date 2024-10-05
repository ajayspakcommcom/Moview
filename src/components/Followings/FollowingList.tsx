// FollowersList.tsx
import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import FollowingItem from './FollowingItem';
import { Text } from 'react-native-paper';


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


interface FollowingListProps {
    following: FollowingType[];
}

const FollowingList: React.FC<FollowingListProps> = ({ following }) => {
    return (
            <View style={styles.container}>
                <FlatList
                    data={following}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => <FollowingItem following={item} />}
                />
            </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default React.memo(FollowingList);
