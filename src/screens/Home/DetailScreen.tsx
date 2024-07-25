import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useRoute, useNavigation, ParamListBase, NavigationProp, RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../styles/Colors';
import { MovieItem } from '../../types/Movie';
import { findMovieById, formatDate } from '../../utils/Common';
import { MovieDataList } from '../../utils/Data';
import Fonts from '../../styles/Fonts';
import { Rating, AirbnbRating } from 'react-native-ratings';
import ReviewList from '../../components/ReviewList/ReviewList';
import CastList from '../../components/CastList/CastList';
import ReviewForm from '../../components/ReviewForm/ReviewForm';
import FastImage from 'react-native-fast-image';


type Props = {

};

const movieList: MovieItem[] = [...MovieDataList];

const DetailScreen: React.FC = () => {

    const navigation: NavigationProp<ParamListBase> = useNavigation();
    const route: RouteProp<{ params: { movie: MovieItem } }> = useRoute();
    const [detailData, setDetailData] = React.useState<Partial<MovieItem>>({});
    const [activeTab, setActiveTab] = React.useState('reviews');

    const [comment, setComment] = React.useState<string>('');
    const [rating, setRating] = React.useState<number>(0);


    React.useLayoutEffect(() => {

        console.log('==========================================');
        console.log('==========================================');
        console.log(route.params.movie);

        setDetailData(prevState => ({
            ...prevState,
            id: route.params.movie?._id,
            title: route.params.movie?.title,
            poster_url: route.params.movie?.poster_url,
            release_date: route.params.movie?.release_date,
            director: route.params.movie?.director,
            genre: route.params.movie?.genre,
        }));


        const backButtonHandler = () => {
            navigation.navigate('HomeScreen');
        };

        const gotoNotification = () => {
            console.log('Notification...');
            navigation.navigate('Notification');
        };

        navigation.setOptions({
            title: `${route.params.movie?.title}`,
            headerLeft: () => {
                return <Icon name={'chevron-back'} size={30} color={Colors.whiteColor} onPress={backButtonHandler} />
            },
            headerRight: () => {
                return <Icon name={'notifications'} size={25} color={Colors.tabActiveColor} onPress={gotoNotification} />
            }
        });

        return () => {

        };
    }, []);

    const ratingCompleted = (rating: number) => {
        setRating(rating);
    }

    const handleTabClick = (tabName: string) => {
        setActiveTab(tabName);
    };

    return (
        <SafeAreaView style={styles.container}>


            <View style={styles.header}>
                {detailData.poster_url &&

                    <FastImage
                        style={styles.img}
                        source={{
                            uri: detailData.poster_url,
                            priority: FastImage.priority.high,
                            cache: FastImage.cacheControl.immutable
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                }
            </View>


            <View style={styles.detailText}>
                <Text style={styles.detailHeading}>{detailData.title}</Text>
                <View style={styles.ratingWrapper}>
                    <AirbnbRating
                        count={5}
                        reviews={["Bad", "Meh", "OK", "Good", "Jesus"]}
                        defaultRating={3}
                        size={16}
                        showRating={false}
                        isDisabled={true}
                    />
                </View>
            </View>

            <View style={styles.genreWrapper}>
                {detailData.genre?.split(',').map((genre, index) => (
                    <View key={index} style={styles.genreItem}>
                        <Text style={styles.genreText}>{genre}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.releaseWrapper}>
                <View style={styles.releaseItem}><Text style={styles.releaseText}>Release date: {detailData.release_date ? formatDate(new Date(detailData.release_date), 'DD/MM/YYYY') : '----'}</Text></View>
            </View>

            <View style={styles.directorWrapper}>
                <View style={styles.directorItem}><Text style={styles.directorText}>Director: {detailData.director}</Text></View>
            </View>

            <View style={styles.hrWrapper}>
                <View style={styles.hr}></View>
            </View>

            <View style={styles.castReviewBtnWrapper}>
                <TouchableOpacity onPress={() => handleTabClick('synopsis')}>
                    <View style={styles.castReviewText}><Text style={[styles.crText, activeTab === 'synopsis' && styles.crTextActive]}>Synopsis & Cast </Text></View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleTabClick('reviews')}>
                    <View style={styles.castReviewText}><Text style={[styles.crText, activeTab === 'reviews' && styles.crTextActive]}>Reviews</Text></View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleTabClick('writeReview')}>
                    <View style={[styles.castReviewText]}><Text style={[styles.crText, activeTab === 'writeReview' && styles.crTextActive]}>Write Review</Text></View>
                </TouchableOpacity>
            </View>


            {activeTab === 'synopsis' && <CastList />}
            {activeTab === 'reviews' && <ReviewList />}
            {activeTab === 'writeReview' && <ScrollView><ReviewForm /></ScrollView>}

        </SafeAreaView>
    );
};


const styles = StyleSheet.create({

    container: {
        flex: 1
    },
    header: {
        width: '100%',
        height: 50,
        paddingHorizontal: 0,
        flexGrow: 1
    },
    img: {
        width: '100%',
        height: 'auto',
        flexGrow: 1
    },
    detailText: {
        paddingVertical: 10,
        paddingHorizontal: 15
    },
    detailHeading: {
        color: Colors.whiteColor,
        fontFamily: Fonts.Family.Bold,
        fontSize: Fonts.Size.Medium + 1,
        textTransform: 'uppercase'
    },
    ratingWrapper: {
        paddingVertical: 0,
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    genreWrapper: {
        flexDirection: 'row',
        paddingHorizontal: 15
    },
    genreItem: {
        marginRight: 15,
        paddingVertical: 1,
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
    },
    releaseWrapper: {
        marginTop: 5,
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
        marginTop: 0,
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
    hrWrapper: {
        paddingVertical: 10,
        width: '100%',
        paddingHorizontal: 15,
    },
    hr: {
        minHeight: 2,
        backgroundColor: Colors.tabBgColor,
    },
    castReviewBtnWrapper: {
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginBottom: 10,
    },
    castReviewText: {

    },
    crText: {
        fontSize: Fonts.Size.Medium,
        color: Colors.tabBgColor,
        fontWeight: '500'
    },

    crTextActive: {
        color: Colors.whiteColor,
    }

});


export default DetailScreen;
