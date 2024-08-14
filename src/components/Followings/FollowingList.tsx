// FollowersList.tsx
import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import FollowingItem from './FollowingItem';


interface Follower {
    id: string;
    name: string;
    profilePicture: string; // URL to the profile picture
}


interface FollowingListProps {
    followers: Follower[];
}

const FollowingList: React.FC<FollowingListProps> = ({ followers }) => {
    return (
        <View style={styles.container}>
            <FlatList
                data={followers}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <FollowingItem follower={item} />}
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
