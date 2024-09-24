import * as React from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl, LayoutChangeEvent } from 'react-native';
import Colors from '../../styles/Colors';
import { MovieItem } from '../../types/Movie';
import Fonts from '../../styles/Fonts';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { API_URL } from '../../configure/config.android';
import { useAuth } from '../../context/AuthContext';
import { Notification } from '../../types/Notification';
import AntDesign from 'react-native-vector-icons/AntDesign';

type Props = {
    notificationData: Notification[];
    onClick?: (id: string) => void;
};

const movieList: MovieItem[] = [
    //{
    //    _id: "64b841e2f3f2f4c2a5d9b9c1",
    //    title: "Inception",
    //    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
    //    release_date: "2010-07-16",
    //    genre: "Sci-Fi",
    //    director: "Christopher Nolan",
    //    rating: 8.8,
    //    cast: [
    //        { _id: "1", actor: "Leonardo DiCaprio", role: "Dom Cobb" },
    //        { _id: "2", actor: "Joseph Gordon-Levitt", role: "Arthur" },
    //        { _id: "3", actor: "Elliot Page", role: "Ariadne" }
    //    ],
    //    poster_url: "https://example.com/inception.jpg",
    //    is_deleted: false,
    //    __v: 1
    //},
    //{
    //    _id: "64b841e2f3f2f4c2a5d9b9c2",
    //    title: "The Dark Knight",
    //    description: "When the menace known as The Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham. The Dark Knight must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    //    release_date: "2008-07-18",
    //    genre: "Action",
    //    director: "Christopher Nolan",
    //    rating: 9.0,
    //    cast: [
    //        { _id: "1", actor: "Christian Bale", role: "Bruce Wayne / Batman" },
    //        { _id: "2", actor: "Heath Ledger", role: "Joker" },
    //        { _id: "3", actor: "Aaron Eckhart", role: "Harvey Dent" }
    //    ],
    //    poster_url: "https://example.com/dark_knight.jpg",
    //    is_deleted: false,
    //    __v: 1
    //},
    //{
    //    _id: "64b841e2f3f2f4c2a5d9b9c3",
    //    title: "Interstellar",
    //    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    //    release_date: "2014-11-07",
    //    genre: "Sci-Fi",
    //    director: "Christopher Nolan",
    //    rating: 8.6,
    //    cast: [
    //        { _id: "1", actor: "Matthew McConaughey", role: "Cooper" },
    //        { _id: "2", actor: "Anne Hathaway", role: "Brand" },
    //        { _id: "3", actor: "Jessica Chastain", role: "Murph" }
    //    ],
    //    poster_url: "https://example.com/interstellar.jpg",
    //    is_deleted: false,
    //    __v: 1
    //}
];

const MyNotification: React.FC<Props> = ({notificationData, onClick}) => {

    const { user, appCounter } = useAuth();
    const flatListRef = React.useRef<FlatList<any>>(null);
    const [refreshing, setRefreshing] = React.useState(false);
    const [data, setData] = React.useState<Notification[]>([]);


    const abortController = new AbortController();
    const signal = abortController.signal;



    React.useLayoutEffect(() => {

        setData(notificationData);

        return () => {
            abortController.abort();
        };
    }, []);

    const onRefresh = () => {
        setTimeout(() => {

        }, 2000);
    };



    const onClose = async (obj: any) => {

        console.log('onClose', obj);
        onClick && onClick(obj._id);

        // const url = `${API_URL}notification/${id}`;
        // const token = user;

        // try {
        //     const response = await fetch(url, {
        //         method: 'DELETE',
        //         headers: {
        //             'Authorization': `Bearer ${token?.token}`,
        //             'Content-Type': 'application/json'
        //         },
        //         signal: signal
        //     });

        //     const result = await response.json();

        //     if (result.status === 'success') {
        //         console.log('success');
        //         appCounter();
        //     }

        // } catch (error) {
        //     if (error instanceof Error) {
        //         if (error.name === 'AbortError') {

        //         } else {

        //         }
        //     } else {

        //     }
        // }

    }

    const renderItem = ({ item }: { item: Notification }) => (
        <>            
            <View style={[styles.item]}>

                {/*<View style={styles.type}>
                    {item.type.trim().toLowerCase() === 'movie' && <Text style={styles.typeText}>M</Text>}
                    {item.type.trim().toLowerCase() === 'show' && <Text style={styles.typeText}>S</Text>}
                </View>*/}

                <View style={styles.actionWrapper}>
                    <AntDesign name={'closesquareo'} size={30} color={Colors.tabActiveColor} onPress={onClose.bind(null, item)} />
                </View>

                <View style={styles.userIcon}>
                    <Icon name={'user-circle'} size={30} color={Colors.whiteColor} />
                </View>

                <View style={[styles.headingWrapper]}>
                    <Text style={styles.heading}>{item.title}</Text>
                    <Text style={styles.desc}>{item.message}</Text>
                </View>

            </View>
        </>
    );

    return (
        <>
            <FlatList
                ref={flatListRef}
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                style={styles.flatListWrapper}
                horizontal={false}
                refreshControl={<RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={[Colors.blackColor, Colors.darkBackgroudColor, Colors.playPauseButtonColor]}
                    progressBackgroundColor={Colors.tabActiveColor}
                />}
                extraData={movieList}
            />
        </>
    );
};

const styles = StyleSheet.create({
    flatListWrapper: {
        paddingTop: 15,
        padding: 20,
    },
    actionWrapper: {
        width: 30,
        height: 30,
        position: 'absolute',
        top: 1,
        right: 1,
        zIndex: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    type: {
        backgroundColor: Colors.tabActiveColor,
        width: 25,
        height: 25,
        borderRadius: 50,
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    typeText: {
        color: Colors.whiteColor,
        fontFamily: Fonts.Family.Light,
        fontSize: Fonts.Size.Small,
        textTransform: 'uppercase'
    },
    item: {
        width: '100%',
        position: 'relative',
        flexDirection: 'row',
        marginBottom: 15,
        backgroundColor: Colors.reviewBgColor,
        alignItems: 'center',
        borderRadius: 5,
    },
    userIcon: {
        paddingRight: 15,
        paddingVertical: 5,
        paddingHorizontal: 10,
        width: '20%'
    },
    headingWrapper: {
        paddingVertical: 10,
        width: '80%'
    },
    heading: {
        color: Colors.whiteColor,
        fontFamily: Fonts.Family.Bold,
        fontSize: Fonts.Size.Medium,
        textTransform: 'uppercase'
    },
    desc: {
        color: Colors.whiteColor,
        fontFamily: Fonts.Family.Medium,
        width: 'auto'
    },
    testWrapper: {
        backgroundColor: 'pink',
        paddingVertical: 10,
        height: 300,
        paddingHorizontal: 50
    },
});

export default React.memo(MyNotification);
