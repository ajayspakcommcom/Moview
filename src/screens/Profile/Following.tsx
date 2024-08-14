import * as React from 'react';
import { View, StyleSheet, } from 'react-native';
import { Text } from 'react-native-paper';
import FollowingList from '../../components/Followings/FollowingList';
import Colors from '../../styles/Colors';
import Icon from 'react-native-vector-icons/Ionicons';


type Props = {
    navigation: any;
    route: any;
};

interface Following {
    id: string;
    name: string;
    profilePicture: string;
}

const following: Following[] = [
    { "id": "1", "name": "Jane Doe", "profilePicture": "https://example.com/jane.jpg" },
    { "id": "2", "name": "John Smith", "profilePicture": "https://example.com/john.jpg" },
    { "id": "3", "name": "Alice Johnson", "profilePicture": "https://example.com/alice.jpg" },
    { "id": "4", "name": "Bob Brown", "profilePicture": "https://example.com/bob.jpg" },
    { "id": "5", "name": "Charlie Davis", "profilePicture": "https://example.com/charlie.jpg" },
    { "id": "6", "name": "Diana Evans", "profilePicture": "https://example.com/diana.jpg" },
    { "id": "7", "name": "Edward Clark", "profilePicture": "https://example.com/edward.jpg" },
    { "id": "8", "name": "Fiona Garcia", "profilePicture": "https://example.com/fiona.jpg" },
    { "id": "9", "name": "George Harris", "profilePicture": "https://example.com/george.jpg" },
    { "id": "10", "name": "Hannah Lewis", "profilePicture": "https://example.com/hannah.jpg" },
    { "id": "11", "name": "Ian Walker", "profilePicture": "https://example.com/ian.jpg" },
    { "id": "12", "name": "Jane Young", "profilePicture": "https://example.com/jane_young.jpg" },
    { "id": "13", "name": "Kyle King", "profilePicture": "https://example.com/kyle.jpg" },
    { "id": "14", "name": "Laura Scott", "profilePicture": "https://example.com/laura.jpg" },
    { "id": "15", "name": "Mike Adams", "profilePicture": "https://example.com/mike.jpg" },
    { "id": "16", "name": "Nina Baker", "profilePicture": "https://example.com/nina.jpg" },
    { "id": "17", "name": "Oliver Green", "profilePicture": "https://example.com/oliver.jpg" },
    { "id": "18", "name": "Paula Hill", "profilePicture": "https://example.com/paula.jpg" },
    { "id": "19", "name": "Quinn Adams", "profilePicture": "https://example.com/quinn.jpg" },
    { "id": "20", "name": "Ryan Clark", "profilePicture": "https://example.com/ryan.jpg" },
    { "id": "21", "name": "Sophie Martin", "profilePicture": "https://example.com/sophie.jpg" },
    { "id": "22", "name": "Thomas Allen", "profilePicture": "https://example.com/thomas.jpg" },
    { "id": "23", "name": "Uma Thompson", "profilePicture": "https://example.com/uma.jpg" },
    { "id": "24", "name": "Victor Nelson", "profilePicture": "https://example.com/victor.jpg" },
    { "id": "25", "name": "Wendy Carter", "profilePicture": "https://example.com/wendy.jpg" },
    { "id": "26", "name": "Xander Mitchell", "profilePicture": "https://example.com/xander.jpg" },
    { "id": "27", "name": "Yara Johnson", "profilePicture": "https://example.com/yara.jpg" },
    { "id": "28", "name": "Zachary Brown", "profilePicture": "https://example.com/zachary.jpg" },
    { "id": "29", "name": "Anna White", "profilePicture": "https://example.com/anna.jpg" },
    { "id": "30", "name": "Bradley Evans", "profilePicture": "https://example.com/bradley.jpg" },
    { "id": "31", "name": "Catherine Carter", "profilePicture": "https://example.com/catherine.jpg" },
    { "id": "32", "name": "David Thompson", "profilePicture": "https://example.com/david.jpg" },
    { "id": "33", "name": "Emily Turner", "profilePicture": "https://example.com/emily.jpg" },
    { "id": "34", "name": "Frank Murphy", "profilePicture": "https://example.com/frank.jpg" },
    { "id": "35", "name": "Grace Rodriguez", "profilePicture": "https://example.com/grace.jpg" },
    { "id": "36", "name": "Henry Lewis", "profilePicture": "https://example.com/henry.jpg" },
    { "id": "37", "name": "Ivy King", "profilePicture": "https://example.com/ivy.jpg" },
    { "id": "38", "name": "Jack Martinez", "profilePicture": "https://example.com/jack.jpg" },
    { "id": "39", "name": "Karen Young", "profilePicture": "https://example.com/karen.jpg" },
    { "id": "40", "name": "Liam Wright", "profilePicture": "https://example.com/liam.jpg" },
    { "id": "41", "name": "Mia Scott", "profilePicture": "https://example.com/mia.jpg" },
    { "id": "42", "name": "Nathan Lee", "profilePicture": "https://example.com/nathan.jpg" },
    { "id": "43", "name": "Olivia Green", "profilePicture": "https://example.com/olivia.jpg" },
    { "id": "44", "name": "Paul Walker", "profilePicture": "https://example.com/paul.jpg" },
    { "id": "45", "name": "Quinn Adams", "profilePicture": "https://example.com/quinn_adams.jpg" },
    { "id": "46", "name": "Riley Taylor", "profilePicture": "https://example.com/riley.jpg" },
    { "id": "47", "name": "Samantha Hill", "profilePicture": "https://example.com/samantha.jpg" },
    { "id": "48", "name": "Timothy Brown", "profilePicture": "https://example.com/timothy.jpg" },
    { "id": "49", "name": "Ursula Davis", "profilePicture": "https://example.com/ursula.jpg" },
    { "id": "50", "name": "Victor Anderson", "profilePicture": "https://example.com/victor_anderson.jpg" }

];

const Following: React.FC<Props> = ({ navigation, route }) => {


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
            <FollowingList following={following} />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

});

export default React.memo(Following);
