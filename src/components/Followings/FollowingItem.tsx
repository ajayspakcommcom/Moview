// FollowerItem.tsx
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';


interface Follower {
    id: string;
    name: string;
    profilePicture: string; // URL to the profile picture
}

interface FollowingItemProps {
    follower: Follower;
}

const FollowingItem: React.FC<FollowingItemProps> = ({ follower }) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: follower.profilePicture }} style={styles.profilePicture} />
            <Text style={styles.name}>{follower.name}</Text>
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
    },
});

export default React.memo(FollowingItem);
