// FollowersList.tsx
import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import FollowerItem from './FollowerItem';


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


interface FollowersListProps {
    followers: FollowerType[];
}

const FollowersList: React.FC<FollowersListProps> = ({ followers }) => {
    return (
        <View style={styles.container}>
            <FlatList
                data={followers}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => <FollowerItem follower={item} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default React.memo(FollowersList);
