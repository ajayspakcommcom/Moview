// FollowerItem.tsx
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Colors from '../../styles/Colors';


interface Following {
    id: string;
    name: string;
    profilePicture: string; // URL to the profile picture
}

interface FollowingItemProps {
    following: Following;
}

const FollowingItem: React.FC<FollowingItemProps> = ({ following }) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: following.profilePicture }} style={styles.profilePicture} />
            <Text style={styles.name}>{following.name}</Text>
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
        color: Colors.whiteColor
    },
});

export default React.memo(FollowingItem);
