// FollowersList.tsx
import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import FollowerItem from './FollowerItem';


interface Follower {
    id: string;
    name: string;
    profilePicture: string; // URL to the profile picture
}


interface FollowersListProps {
    followers: Follower[];
}

const FollowersList: React.FC<FollowersListProps> = ({ followers }) => {
    return (
        <View style={styles.container}>
            <FlatList
                data={followers}
                keyExtractor={(item) => item.id}
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
