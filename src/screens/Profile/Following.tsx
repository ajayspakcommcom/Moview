import * as React from 'react';
import { View, StyleSheet, } from 'react-native';
import { Text } from 'react-native-paper';
import FollowingList from '../../components/Followings/FollowingList';
import Colors from '../../styles/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../../context/AuthContext';
import { API_URL } from '../../configure/config.android';


type Props = {
    navigation: any;
    route: any;
};

type User = {
    _id: string;
    firstname: string;
    username: string;
    email: string;
    phone: string;
    password_hash: string;
    is_deleted: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    __v: number;
};

type FollowingType = {
    _id: string;
    userId: string;
    followingId: User;
    createdAt: string;
    __v: number;
};

const following: FollowingType[] = [
    // { "_id": "1", "name": "Jane Doe", "profilePicture": "https://randomuser.me/api/portraits/men/1.jpg" },
    // { "_id": "2", "name": "John Smith", "profilePicture": "https://randomuser.me/api/portraits/men/2.jpg" },
    // { "_id": "3", "name": "Alice Johnson", "profilePicture": "https://randomuser.me/api/portraits/men/3.jpg" },
    // { "_id": "4", "name": "Bob Brown", "profilePicture": "https://randomuser.me/api/portraits/men/4.jpg" },
    // { "_id": "5", "name": "Charlie Davis", "profilePicture": "https://randomuser.me/api/portraits/men/5.jpg" },
    // { "_id": "6", "name": "Diana Evans", "profilePicture": "https://randomuser.me/api/portraits/men/6.jpg" },
    // { "_id": "7", "name": "Edward Clark", "profilePicture": "https://randomuser.me/api/portraits/men/7.jpg" },
    // { "_id": "8", "name": "Fiona Garcia", "profilePicture": "https://randomuser.me/api/portraits/men/8.jpg" },
    // { "_id": "9", "name": "George Harris", "profilePicture": "https://randomuser.me/api/portraits/men/9.jpg" },
    // { "_id": "10", "name": "Hannah Lewis", "profilePicture": "https://randomuser.me/api/portraits/men/10.jpg" },
    // { "_id": "11", "name": "Ian Walker", "profilePicture": "https://randomuser.me/api/portraits/men/11.jpg" },
    // { "_id": "12", "name": "Jane Young", "profilePicture": "https://randomuser.me/api/portraits/men/12.jpg" },
    // { "_id": "13", "name": "Kyle King", "profilePicture": "https://randomuser.me/api/portraits/men/13.jpg" },
    // { "_id": "14", "name": "Laura Scott", "profilePicture": "https://randomuser.me/api/portraits/men/14.jpg" },
    // { "_id": "15", "name": "Mike Adams", "profilePicture": "https://randomuser.me/api/portraits/men/15.jpg" },
    // { "_id": "16", "name": "Nina Baker", "profilePicture": "https://randomuser.me/api/portraits/men/16.jpg" },
    // { "_id": "17", "name": "Oliver Green", "profilePicture": "https://randomuser.me/api/portraits/men/17.jpg" },
    // { "_id": "18", "name": "Paula Hill", "profilePicture": "https://randomuser.me/api/portraits/men/18.jpg" },
    // { "_id": "19", "name": "Quinn Adams", "profilePicture": "https://randomuser.me/api/portraits/men/19.jpg" },
    // { "_id": "20", "name": "Ryan Clark", "profilePicture": "https://randomuser.me/api/portraits/men/20.jpg" },
    // { "_id": "21", "name": "Sophie Martin", "profilePicture": "https://randomuser.me/api/portraits/men/21.jpg" },
    // { "_id": "22", "name": "Thomas Allen", "profilePicture": "https://randomuser.me/api/portraits/men/22.jpg" },
    // { "_id": "23", "name": "Uma Thompson", "profilePicture": "https://randomuser.me/api/portraits/men/23.jpg" },
    // { "_id": "24", "name": "Victor Nelson", "profilePicture": "https://randomuser.me/api/portraits/men/24.jpg" },
    // { "_id": "25", "name": "Wendy Carter", "profilePicture": "https://randomuser.me/api/portraits/men/25.jpg" },
    // { "_id": "26", "name": "Xander Mitchell", "profilePicture": "https://randomuser.me/api/portraits/men/26.jpg" },
    // { "_id": "27", "name": "Yara Johnson", "profilePicture": "https://randomuser.me/api/portraits/men/27.jpg" },
    // { "_id": "28", "name": "Zachary Brown", "profilePicture": "https://randomuser.me/api/portraits/men/28.jpg" },
    // { "_id": "29", "name": "Anna White", "profilePicture": "https://randomuser.me/api/portraits/men/29.jpg" },
    // { "_id": "30", "name": "Bradley Evans", "profilePicture": "https://randomuser.me/api/portraits/men/30.jpg" },
    // { "_id": "31", "name": "Catherine Carter", "profilePicture": "https://randomuser.me/api/portraits/men/31.jpg" },
    // { "_id": "32", "name": "David Thompson", "profilePicture": "https://randomuser.me/api/portraits/men/32.jpg" },
    // { "_id": "33", "name": "Emily Turner", "profilePicture": "https://randomuser.me/api/portraits/men/33.jpg" },
    // { "_id": "34", "name": "Frank Murphy", "profilePicture": "https://randomuser.me/api/portraits/men/34.jpg" },
    // { "_id": "35", "name": "Grace Rodriguez", "profilePicture": "https://randomuser.me/api/portraits/men/35.jpg" },
    // { "_id": "36", "name": "Henry Lewis", "profilePicture": "https://randomuser.me/api/portraits/men/36.jpg" },
    // { "_id": "37", "name": "Ivy King", "profilePicture": "https://randomuser.me/api/portraits/men/37.jpg" },
    // { "_id": "38", "name": "Jack Martinez", "profilePicture": "https://randomuser.me/api/portraits/men/38.jpg" },
    // { "_id": "39", "name": "Karen Young", "profilePicture": "https://randomuser.me/api/portraits/men/39.jpg" },
    // { "_id": "40", "name": "Liam Wright", "profilePicture": "https://randomuser.me/api/portraits/men/40.jpg" },
    // { "_id": "41", "name": "Mia Scott", "profilePicture": "https://randomuser.me/api/portraits/men/41.jpg" },
    // { "_id": "42", "name": "Nathan Lee", "profilePicture": "https://randomuser.me/api/portraits/men/42.jpg" },
    // { "_id": "43", "name": "Olivia Green", "profilePicture": "https://randomuser.me/api/portraits/men/43.jpg" },
    // { "_id": "44", "name": "Paul Walker", "profilePicture": "https://randomuser.me/api/portraits/men/44.jpg" },
    // { "_id": "45", "name": "Quinn Adams", "profilePicture": "https://randomuser.me/api/portraits/men/45.jpg" },
    // { "_id": "46", "name": "Riley Taylor", "profilePicture": "https://randomuser.me/api/portraits/men/46.jpg" },
    // { "_id": "47", "name": "Samantha Hill", "profilePicture": "https://randomuser.me/api/portraits/men/47.jpg" },
    // { "_id": "48", "name": "Timothy Brown", "profilePicture": "https://randomuser.me/api/portraits/men/48.jpg" },
    // { "_id": "49", "name": "Ursula Davis", "profilePicture": "https://randomuser.me/api/portraits/men/49.jpg" },
    // { "_id": "50", "name": "Victor Anderson", "profilePicture": "https://randomuser.me/api/portraits/men/50.jpg" }

];

const Following: React.FC<Props> = ({ navigation, route }) => {

    const { user, userDetail } = useAuth();

    const [followingData, setFollowingData] = React.useState<FollowingType[]>([]);

    const abortController = new AbortController();
    const signal = abortController.signal;

    const backButtonHandler = () => {
        navigation.navigate('HomeScreen');
    };



    const getFollowingList = async () => {

        const url = `${API_URL}following/${userDetail._id}`;
        const token = user;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token?.token}`,
                    'Content-Type': 'application/json'
                },
                signal: signal
            });

            const result = await response.json();
            console.log('');
            console.log('');
            console.log('');
            console.log('');
            console.log('Length', result.data.length);
            console.log('');
            console.log('');
            console.log('');
            console.log('');
            console.log('Result', result.data);

            if (result.status === 'success') {
                setFollowingData(result.data)
            }

        } catch (error) {
            if (error instanceof Error) {
                if (error.name === 'AbortError') {
                    //
                }
            }
        }
    };

    const headerHandler = () => {
        navigation.setOptions({
            title: ``,
            headerLeft: () => {
                return <Icon name={'chevron-back'} size={30} color={Colors.whiteColor} onPress={backButtonHandler} />
            },
            headerRight: () => {
                return <Icon name={'notifications'} size={25} color={Colors.tabActiveColor} />
            }
        });
    };


    React.useLayoutEffect(() => {

        headerHandler();
        getFollowingList();

        return () => {

        }
    }, []);



    return (
        <>
            <FollowingList following={followingData} />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

});

export default React.memo(Following);
