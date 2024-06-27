import * as React from 'react';
import { View, Text, StyleSheet, Button, ScrollView, ImageSourcePropType, Image } from 'react-native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { useRoute, useNavigation, ParamListBase, NavigationProp, RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../styles/Colors';
import { MovieItem } from '../../types/Movie';
import { findMovieById } from '../../utils/Common';
import { MovieDataList } from '../../utils/Data';
import Fonts from '../../styles/Fonts';
import { Rating, AirbnbRating } from 'react-native-ratings';


type Props = {

};

const movieList: MovieItem[] = [...MovieDataList];

const DetailScreen: React.FC<Props> = ({ }) => {

    const navigation: NavigationProp<ParamListBase> = useNavigation();
    const route: RouteProp<{ params: { id: string } }> = useRoute();
    const [detailData, setDetailData] = React.useState<Partial<MovieItem>>({});

    React.useLayoutEffect(() => {

        const movie = findMovieById(movieList, route.params.id);

        setDetailData(prevState => ({
            ...prevState,
            id: movie?.id,
            title: movie?.title,
            image: movie?.image,
            videoUrl: movie?.videoUrl
        }));

        const backButtonHandler = () => {
            navigation.navigate('HomeScreen');
        };

        const gotoNotification = () => {
            console.log('Notification...');
        };

        navigation.setOptions({
            title: `${movie?.title}`,
            headerLeft: () => {
                return <Icon name={'chevron-back'} size={30} color={Colors.whiteColor} onPress={backButtonHandler} />
            },
            headerRight: () => {
                return <Icon name={'notifications'} size={25} color={Colors.tabActiveColor} onPress={gotoNotification} />
            }
        });

        return console.log('');
    }, []);

    const ratingCompleted = (rating: number) => {
        console.log("Rating is: " + rating)
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                {detailData.image && <Image source={detailData.image} style={styles.img} />}
            </View>

            <View style={styles.detailText}>
                <Text style={styles.detailHeading}>Black Panther</Text>
                <View style={styles.ratingWrapper}>
                    <AirbnbRating
                        count={5}
                        reviews={["Bad", "Meh", "OK", "Good", "Jesus"]}
                        defaultRating={1}
                        size={25}
                        onFinishRating={ratingCompleted}
                        showRating={false}
                    />
                </View>
            </View>

            <View style={styles.genreWrapper}>
                <View style={styles.genreItem}><Text style={styles.genreText}>Action</Text></View>
                <View style={styles.genreItem}><Text style={styles.genreText}>Adventures</Text></View>
                <View style={styles.genreItem}><Text style={styles.genreText}>Sic-Fi</Text></View>
            </View>

        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 15
    },
    img: {
        width: '100%',
        height: 300,
        resizeMode: 'cover'
    },
    detailText: {
        paddingVertical: 15,
        paddingHorizontal: 15
    },
    detailHeading: {
        color: Colors.whiteColor,
        fontFamily: Fonts.Family.Bold,
        fontSize: Fonts.Size.Medium + 4,
        textTransform: 'uppercase'
    },

    ratingWrapper: {
        paddingVertical: 5,
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },

    genreWrapper: {
        flexDirection: 'row',
        paddingHorizontal: 15
    },
    genreItem: {
        marginRight: 15,
        paddingVertical: 2,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: Colors.whiteColor,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    genreText: {
        color: Colors.whiteColor,
        fontFamily: Fonts.Family.Medium
    }



});


export default DetailScreen;
