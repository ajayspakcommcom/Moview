import * as React from 'react';
import { View, Text, StyleSheet, FlatList, Image, RefreshControl } from 'react-native';
import Colors from '../../styles/Colors';
import { useRoute, useNavigation, ParamListBase, NavigationProp, RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { MovieItem } from '../../types/Movie';
import { MovieDataList } from '../../utils/Data';
import Fonts from '../../styles/Fonts';
import { AirbnbRating } from 'react-native-ratings';
import FastImage from 'react-native-fast-image';

type Props = {

};

const movieList: MovieItem[] = [...MovieDataList];

const Notification: React.FC<Props> = () => {

    const navigation: NavigationProp<ParamListBase> = useNavigation();
    const route: RouteProp<{ params: { id: string, queryParams: any } }> = useRoute();

    const flatListRef = React.useRef<FlatList<any>>(null);
    const [refreshing, setRefreshing] = React.useState(false);

    React.useLayoutEffect(() => {

        const backButtonHandler = () => {
            navigation.navigate('Profile', { screen: 'HomeScreen' });
        };

        const gotoNotification = () => {
            console.log('Notification...');
        };

        navigation.setOptions({
            title: `Notifcation`,
            headerLeft: () => {
                return <Icon name={'chevron-back'} size={30} color={Colors.whiteColor} onPress={backButtonHandler} />
            },
            headerRight: () => {
                return <Icon name={'notifications'} size={25} color={Colors.tabActiveColor} onPress={gotoNotification} />
            }
        });

        return console.log('');
    }, []);

    const onRefresh = () => {
        setTimeout(() => {
            console.log('......');
        }, 2000);
    };

    const navigateToDetails = (itemId: string) => {
        //navigation.navigate('DetailScreen', { id: itemId });
    };

    const renderItem = ({ item }: { item: MovieItem }) => (
        <View style={[styles.item]}>
            <View style={styles.content}>

                <FastImage
                    source={{ uri: movieList[0].poster_url }} style={styles.img}
                    resizeMode={FastImage.resizeMode.contain}
                />

            </View>
            <View style={styles.img}>
                <View style={styles.detailText}>
                    <Text style={styles.detailHeading}>Black Panther</Text>
                    <View style={styles.ratingWrapper}>
                        <AirbnbRating
                            count={5}
                            reviews={["Bad", "Meh", "OK", "Good", "Jesus"]}
                            defaultRating={3}
                            size={18}
                            showRating={false}
                            isDisabled={true}
                        />
                    </View>
                </View>

                {/* <View style={styles.genreWrapper}>
                    <View style={styles.genreItem}><Text style={styles.genreText}>Action</Text></View>
                    <View style={styles.genreItem}><Text style={styles.genreText}>Adventures</Text></View>
                    <View style={styles.genreItem}><Text style={styles.genreText}>Sic-Fi</Text></View>
                </View> */}

                <View style={styles.genreWrapper}>
                    <Text style={styles.genreText}>Action</Text>
                    <Text style={styles.genreText}>Adventures</Text>
                    <Text style={styles.genreText}>Sic-Fi</Text>
                </View>

                <View style={styles.releaseWrapper}>
                    <View style={styles.releaseItem}><Text style={styles.releaseText}>Release date: 14 February 2018</Text></View>
                </View>

                <View style={styles.directorWrapper}>
                    <View style={styles.directorItem}><Text style={styles.directorText}>Director: Ryan Coogler</Text></View>
                </View>
            </View>
        </View >
    );

    return (
        <>
            <FlatList
                ref={flatListRef}
                data={movieList}
                renderItem={renderItem}
                keyExtractor={item => item._id}

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
    item: {
        width: '100%',
        position: 'relative',
        flexDirection: 'row',
        marginBottom: 15,
        paddingHorizontal: 15
    },
    img: {
        width: 180,
        height: 300,
        resizeMode: 'cover'
    },
    content: {
        width: '50%',
    },
    detailText: {
        paddingVertical: 15,
        paddingHorizontal: 15
    },
    detailHeading: {
        color: Colors.whiteColor,
        fontFamily: Fonts.Family.Bold,
        fontSize: Fonts.Size.Medium,
        textTransform: 'uppercase'
    },
    ratingWrapper: {
        paddingVertical: 5,
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    genreWrapper: {
        display: 'flex',
        paddingHorizontal: 15,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    genreText: {
        color: Colors.whiteColor,
        fontFamily: Fonts.Family.Medium,
        borderColor: Colors.whiteColor,
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 50,
        marginBottom: 10,
        display: 'flex',
        marginRight: 15
    },
    releaseWrapper: {
        marginTop: 0,
        paddingHorizontal: 15,
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    releaseItem: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    releaseText: {
        color: Colors.whiteColor,
        fontFamily: Fonts.Family.Medium
    },
    directorWrapper: {
        marginTop: 10,
        paddingHorizontal: 15,
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    directorItem: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    directorText: {
        color: Colors.whiteColor,
        fontFamily: Fonts.Family.Medium
    },
    editableRating: {
        width: '100%',
        paddingTop: 25
    },
    formWrapper: {
        marginTop: 20,
        paddingHorizontal: 15,
        marginBottom: 15
    },
    textInput: {
        backgroundColor: Colors.playPauseButtonColor,
        width: '100%',
        height: 120,
        paddingHorizontal: 10,
        fontSize: Fonts.Size.Medium,
        textAlignVertical: 'top',
        color: Colors.whiteColor,
        marginBottom: 15
    }
});

export default Notification;
