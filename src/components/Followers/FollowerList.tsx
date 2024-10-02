import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import FollowerItem from './FollowerItem';
import { FollowerType } from '../../models/Follower';

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
        flex: 1
    },
});

export default React.memo(FollowersList);
