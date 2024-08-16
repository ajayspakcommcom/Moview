import * as React from 'react';
import { View, StyleSheet, } from 'react-native';
import { Text } from 'react-native-paper';

import Icon from 'react-native-vector-icons/Ionicons';

import FollowerList from '../../components/Followers/FollowerList';
import Colors from '../../styles/Colors';


type Props = {
    navigation: any;
    route: any;
};

interface Follower {
    id: string;
    name: string;
    profilePicture: string;
}

const followers: Follower[] = [
    { "id": "1", "name": "Jane Doe", "profilePicture": "https://randomuser.me/api/portraits/men/1.jpg" },
    { "id": "2", "name": "John Smith", "profilePicture": "https://randomuser.me/api/portraits/men/2.jpg" },
    { "id": "3", "name": "Alice Johnson", "profilePicture": "https://randomuser.me/api/portraits/men/3.jpg" },
    { "id": "4", "name": "Bob Brown", "profilePicture": "https://randomuser.me/api/portraits/men/4.jpg" },
    { "id": "5", "name": "Charlie Davis", "profilePicture": "https://randomuser.me/api/portraits/men/5.jpg" },
    { "id": "6", "name": "Diana Evans", "profilePicture": "https://randomuser.me/api/portraits/men/6.jpg" },
    { "id": "7", "name": "Edward Clark", "profilePicture": "https://randomuser.me/api/portraits/men/7.jpg" },
    { "id": "8", "name": "Fiona Garcia", "profilePicture": "https://randomuser.me/api/portraits/men/8.jpg" },
    { "id": "9", "name": "George Harris", "profilePicture": "https://randomuser.me/api/portraits/men/9.jpg" },
    { "id": "10", "name": "Hannah Lewis", "profilePicture": "https://randomuser.me/api/portraits/men/10.jpg" },
    { "id": "11", "name": "Ian Walker", "profilePicture": "https://randomuser.me/api/portraits/men/11.jpg" },
    { "id": "12", "name": "Jane Young", "profilePicture": "https://randomuser.me/api/portraits/men/12.jpg" },
    { "id": "13", "name": "Kyle King", "profilePicture": "https://randomuser.me/api/portraits/men/13.jpg" },
    { "id": "14", "name": "Laura Scott", "profilePicture": "https://randomuser.me/api/portraits/men/14.jpg" },
    { "id": "15", "name": "Mike Adams", "profilePicture": "https://randomuser.me/api/portraits/men/15.jpg" },
    { "id": "16", "name": "Nina Baker", "profilePicture": "https://randomuser.me/api/portraits/men/16.jpg" },
    { "id": "17", "name": "Oliver Green", "profilePicture": "https://randomuser.me/api/portraits/men/17.jpg" },
    { "id": "18", "name": "Paula Hill", "profilePicture": "https://randomuser.me/api/portraits/men/18.jpg" },
    { "id": "19", "name": "Quinn Adams", "profilePicture": "https://randomuser.me/api/portraits/men/19.jpg" },
    { "id": "20", "name": "Ryan Clark", "profilePicture": "https://randomuser.me/api/portraits/men/20.jpg" },
    { "id": "21", "name": "Sophie Martin", "profilePicture": "https://randomuser.me/api/portraits/men/21.jpg" },
    { "id": "22", "name": "Thomas Allen", "profilePicture": "https://randomuser.me/api/portraits/men/22.jpg" },
    { "id": "23", "name": "Uma Thompson", "profilePicture": "https://randomuser.me/api/portraits/men/23.jpg" },
    { "id": "24", "name": "Victor Nelson", "profilePicture": "https://randomuser.me/api/portraits/men/24.jpg" },
    { "id": "25", "name": "Wendy Carter", "profilePicture": "https://randomuser.me/api/portraits/men/25.jpg" },
    { "id": "26", "name": "Xander Mitchell", "profilePicture": "https://randomuser.me/api/portraits/men/26.jpg" },
    { "id": "27", "name": "Yara Johnson", "profilePicture": "https://randomuser.me/api/portraits/men/27.jpg" },
    { "id": "28", "name": "Zachary Brown", "profilePicture": "https://randomuser.me/api/portraits/men/28.jpg" },
    { "id": "29", "name": "Anna White", "profilePicture": "https://randomuser.me/api/portraits/men/29.jpg" },
    { "id": "30", "name": "Bradley Evans", "profilePicture": "https://randomuser.me/api/portraits/men/30.jpg" },
    { "id": "31", "name": "Catherine Carter", "profilePicture": "https://randomuser.me/api/portraits/men/31.jpg" },
    { "id": "32", "name": "David Thompson", "profilePicture": "https://randomuser.me/api/portraits/men/32.jpg" },
    { "id": "33", "name": "Emily Turner", "profilePicture": "https://randomuser.me/api/portraits/men/33.jpg" },
    { "id": "34", "name": "Frank Murphy", "profilePicture": "https://randomuser.me/api/portraits/men/34.jpg" },
    { "id": "35", "name": "Grace Rodriguez", "profilePicture": "https://randomuser.me/api/portraits/men/35.jpg" },
    { "id": "36", "name": "Henry Lewis", "profilePicture": "https://randomuser.me/api/portraits/men/36.jpg" },
    { "id": "37", "name": "Ivy King", "profilePicture": "https://randomuser.me/api/portraits/men/37.jpg" },
    { "id": "38", "name": "Jack Martinez", "profilePicture": "https://randomuser.me/api/portraits/men/38.jpg" },
    { "id": "39", "name": "Karen Young", "profilePicture": "https://randomuser.me/api/portraits/men/39.jpg" },
    { "id": "40", "name": "Liam Wright", "profilePicture": "https://randomuser.me/api/portraits/men/40.jpg" },
    { "id": "41", "name": "Mia Scott", "profilePicture": "https://randomuser.me/api/portraits/men/41.jpg" },
    { "id": "42", "name": "Nathan Lee", "profilePicture": "https://randomuser.me/api/portraits/men/42.jpg" },
    { "id": "43", "name": "Olivia Green", "profilePicture": "https://randomuser.me/api/portraits/men/43.jpg" },
    { "id": "44", "name": "Paul Walker", "profilePicture": "https://randomuser.me/api/portraits/men/44.jpg" },
    { "id": "45", "name": "Quinn Adams", "profilePicture": "https://randomuser.me/api/portraits/men/45.jpg" },
    { "id": "46", "name": "Riley Taylor", "profilePicture": "https://randomuser.me/api/portraits/men/46.jpg" },
    { "id": "47", "name": "Samantha Hill", "profilePicture": "https://randomuser.me/api/portraits/men/47.jpg" },
    { "id": "48", "name": "Timothy Brown", "profilePicture": "https://randomuser.me/api/portraits/men/48.jpg" },
    { "id": "49", "name": "Ursula Davis", "profilePicture": "https://randomuser.me/api/portraits/men/49.jpg" },
    { "id": "50", "name": "Victor Anderson", "profilePicture": "https://randomuser.me/api/portraits/men/50.jpg" }

];


const Follower: React.FC<Props> = ({ navigation, route }) => {


    const backButtonHandler = () => {
        navigation.navigate('HomeScreen');
    };

    React.useLayoutEffect(() => {

        navigation.setOptions({
            title: ``,
            headerLeft: () => {
                return <Icon name={'chevron-back'} size={30} color={Colors.whiteColor} onPress={backButtonHandler} />
            },
            headerRight: () => {
                return <Icon name={'notifications'} size={25} color={Colors.tabActiveColor} />
            }
        });

        return () => {

        }
    }, []);



    return (
        <>
            <FollowerList followers={followers} />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default React.memo(Follower);
