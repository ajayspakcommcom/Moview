// FollowersList.tsx
import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import FollowingItem from './FollowingItem';


interface Following {
    id: string;
    name: string;
    profilePicture: string; // URL to the profile picture
}


interface FollowingListProps {
    following: Following[];
}

const FollowingList: React.FC<FollowingListProps> = ({ following }) => {
    return (
        <View style={styles.container}>
            <FlatList
                data={following}
                keyExtractor={(item) => item.id}
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
