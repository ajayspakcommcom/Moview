import React from 'react';
import { View, StyleSheet, ListRenderItem, Image, Text, FlatList } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { API_URL } from '../../configure/config.android';

const Tab = createMaterialTopTabNavigator();

interface Profile {
    id: string;
    name: string;
    profilePicture: string;
}

interface UserProfile {
    __v: number;
    _id: string;
    created_at: string;
    deleted_at: string;
    is_deleted: boolean;
    name: string;
    profilePicture: string;
    updated_at: string;
}

const renderItem: ListRenderItem<UserProfile> = ({ item }) => (
    <View style={styles.itemContainer}>
        <Image source={{ uri: item.profilePicture }} style={styles.img} />
        <Text style={styles.text}>{item.name}</Text>
    </View>
);

const TestScreen = () => {

    const [userProfile, setUserProfile] = React.useState<UserProfile[]>();

    const getTestData = async () => {

        const url = `${API_URL}test`;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const respData = await response.json();

            if (respData.status === 'success') {
                setUserProfile(respData.data);
            }
        } catch (error) {
            
        }
    };

    React.useLayoutEffect(() => {

        getTestData();

        return () => {

        }
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={userProfile}
                renderItem={renderItem}
                keyExtractor={item => item._id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#021526'
    },
    itemContainer: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 15,
        alignItems: 'center'
    },
    img: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15
    },
    text: {
        color: '#fff',
        fontWeight: '700'
    },
    buttonWrapper: {
        marginTop: 15,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    button: {
        width: 150,
        marginRight: 15,
        marginBottom: 15
    }

});

export default TestScreen;
