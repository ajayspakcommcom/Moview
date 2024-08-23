import React from 'react';
import { View, StyleSheet, ListRenderItem, Image, Text, FlatList } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Test1 from './Test1';
import Test2 from './Test2';
import Test3 from './Test3';
import Test4 from './Test4';
import Test5 from './Test5';
import Test6 from './Test6';

const Tab = createMaterialTopTabNavigator();

interface Profile {
    id: string;
    name: string;
    profilePicture: string;
}

const profile: Profile[] = [
    { "id": "1", "name": "Jane Doe", "profilePicture": "https://randomuser.me/api/portraits/women/1.jpg" },
    { "id": "2", "name": "John Smith", "profilePicture": "https://randomuser.me/api/portraits/men/2.jpg" },
    { "id": "3", "name": "Emily Johnson", "profilePicture": "https://randomuser.me/api/portraits/women/3.jpg" },
    { "id": "4", "name": "Michael Brown", "profilePicture": "https://randomuser.me/api/portraits/men/4.jpg" },
    { "id": "5", "name": "Sarah Davis", "profilePicture": "https://randomuser.me/api/portraits/women/5.jpg" },
    { "id": "6", "name": "David Wilson", "profilePicture": "https://randomuser.me/api/portraits/men/6.jpg" },
    { "id": "7", "name": "Laura Moore", "profilePicture": "https://randomuser.me/api/portraits/women/7.jpg" },
    { "id": "8", "name": "Chris Taylor", "profilePicture": "https://randomuser.me/api/portraits/men/8.jpg" },
    { "id": "9", "name": "Anna Lee", "profilePicture": "https://randomuser.me/api/portraits/women/9.jpg" },
    { "id": "10", "name": "James White", "profilePicture": "https://randomuser.me/api/portraits/men/10.jpg" },
    { "id": "11", "name": "Olivia Harris", "profilePicture": "https://randomuser.me/api/portraits/women/11.jpg" },
    { "id": "12", "name": "Matthew Clark", "profilePicture": "https://randomuser.me/api/portraits/men/12.jpg" },
    { "id": "13", "name": "Sophia Lewis", "profilePicture": "https://randomuser.me/api/portraits/women/13.jpg" },
    { "id": "14", "name": "Joshua Walker", "profilePicture": "https://randomuser.me/api/portraits/men/14.jpg" },
    { "id": "15", "name": "Chloe Hall", "profilePicture": "https://randomuser.me/api/portraits/women/15.jpg" },
    { "id": "16", "name": "Daniel Allen", "profilePicture": "https://randomuser.me/api/portraits/men/16.jpg" },
    { "id": "17", "name": "Grace Young", "profilePicture": "https://randomuser.me/api/portraits/women/17.jpg" },
    { "id": "18", "name": "Benjamin King", "profilePicture": "https://randomuser.me/api/portraits/men/18.jpg" },
    { "id": "19", "name": "Victoria Wright", "profilePicture": "https://randomuser.me/api/portraits/women/19.jpg" },
    { "id": "20", "name": "Christopher Green", "profilePicture": "https://randomuser.me/api/portraits/men/20.jpg" },
    { "id": "21", "name": "Isabella Adams", "profilePicture": "https://randomuser.me/api/portraits/women/21.jpg" },
    { "id": "22", "name": "Ryan Baker", "profilePicture": "https://randomuser.me/api/portraits/men/22.jpg" },
    { "id": "23", "name": "Mia Campbell", "profilePicture": "https://randomuser.me/api/portraits/women/23.jpg" },
    { "id": "24", "name": "Andrew Mitchell", "profilePicture": "https://randomuser.me/api/portraits/men/24.jpg" },
    { "id": "25", "name": "Amelia Roberts", "profilePicture": "https://randomuser.me/api/portraits/women/25.jpg" },
    { "id": "26", "name": "Ethan Carter", "profilePicture": "https://randomuser.me/api/portraits/men/26.jpg" },
    { "id": "27", "name": "Lily Phillips", "profilePicture": "https://randomuser.me/api/portraits/women/27.jpg" },
    { "id": "28", "name": "Mason Evans", "profilePicture": "https://randomuser.me/api/portraits/men/28.jpg" },
    { "id": "29", "name": "Ella Turner", "profilePicture": "https://randomuser.me/api/portraits/women/29.jpg" },
    { "id": "30", "name": "Lucas Parker", "profilePicture": "https://randomuser.me/api/portraits/men/30.jpg" },
    { "id": "31", "name": "Zoe Edwards", "profilePicture": "https://randomuser.me/api/portraits/women/31.jpg" },
    { "id": "32", "name": "Jack Collins", "profilePicture": "https://randomuser.me/api/portraits/men/32.jpg" },
    { "id": "33", "name": "Scarlett Morris", "profilePicture": "https://randomuser.me/api/portraits/women/33.jpg" },
    { "id": "34", "name": "Henry Scott", "profilePicture": "https://randomuser.me/api/portraits/men/34.jpg" },
    { "id": "35", "name": "Ellie Bell", "profilePicture": "https://randomuser.me/api/portraits/women/35.jpg" },
    { "id": "36", "name": "Alexander Murphy", "profilePicture": "https://randomuser.me/api/portraits/men/36.jpg" },
    { "id": "37", "name": "Grace Sanders", "profilePicture": "https://randomuser.me/api/portraits/women/37.jpg" },
    { "id": "38", "name": "Logan Price", "profilePicture": "https://randomuser.me/api/portraits/men/38.jpg" },
    { "id": "39", "name": "Luna Rivera", "profilePicture": "https://randomuser.me/api/portraits/women/39.jpg" },
    { "id": "40", "name": "Nathan Powell", "profilePicture": "https://randomuser.me/api/portraits/men/40.jpg" },
    { "id": "41", "name": "Chloe Hughes", "profilePicture": "https://randomuser.me/api/portraits/women/41.jpg" },
    { "id": "42", "name": "Gabriel Reed", "profilePicture": "https://randomuser.me/api/portraits/men/42.jpg" },
    { "id": "43", "name": "Layla Long", "profilePicture": "https://randomuser.me/api/portraits/women/43.jpg" },
    { "id": "44", "name": "Jayden Gray", "profilePicture": "https://randomuser.me/api/portraits/men/44.jpg" },
    { "id": "45", "name": "Zara Hughes", "profilePicture": "https://randomuser.me/api/portraits/women/45.jpg" },
    { "id": "46", "name": "Samuel Hughes", "profilePicture": "https://randomuser.me/api/portraits/men/46.jpg" },
    { "id": "47", "name": "Madison James", "profilePicture": "https://randomuser.me/api/portraits/women/47.jpg" },
    { "id": "48", "name": "Luke Harris", "profilePicture": "https://randomuser.me/api/portraits/men/48.jpg" },
    { "id": "49", "name": "Isabelle White", "profilePicture": "https://randomuser.me/api/portraits/women/49.jpg" },
    { "id": "50", "name": "David Walker", "profilePicture": "https://randomuser.me/api/portraits/men/50.jpg" },
];

const renderItem: ListRenderItem<Profile> = ({ item }) => (
    <View style={styles.itemContainer}>
        <Image source={{ uri: item.profilePicture }} style={styles.img} />
        <Text style={styles.text}>{item.name}</Text>
    </View>
);

const TestScreen = () => {
    return (
        <View style={styles.container}>
            <FlatList
                data={profile}
                renderItem={renderItem}
                keyExtractor={item => item.id}
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
