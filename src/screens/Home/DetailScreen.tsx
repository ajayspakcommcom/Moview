import * as React from 'react';
import { View, TextInput, Button, ScrollView, KeyboardAvoidingView, Alert, StyleSheet, Text, ListRenderItem, TouchableOpacity, FlatList } from 'react-native';
import { useRoute, useNavigation, ParamListBase, NavigationProp, RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../styles/Colors';
import { MovieItem } from '../../types/Movie';
import { formatDate } from '../../utils/Common';
import Fonts from '../../styles/Fonts';
import { AirbnbRating } from 'react-native-ratings';
import CastList from '../../components/CastList/CastList';
import ReviewForm from '../../components/ReviewForm/ReviewForm';
import FastImage from 'react-native-fast-image';
import MovieImageMap from '../../utils/MovieImageMap';
import ReviewList from '../../components/ReviewList/ReviewList';
import CastItem from '../../components/CastList/CastItem';
import ReviewItem from '../../components/ReviewList/ReviewItem';


interface ListItem {
    id: string;
    name: string;
}





const DetailScreen: React.FC = () => {

    const navigation: NavigationProp<ParamListBase> = useNavigation();
    const route: RouteProp<{ params: { movie: MovieItem } }> = useRoute();
    const [detailData, setDetailData] = React.useState<Partial<MovieItem>>({});
    const [activeTab, setActiveTab] = React.useState('reviews');

    React.useLayoutEffect(() => {

        setDetailData(prevState => ({
            ...prevState,
            id: route.params.movie?._id,
            title: route.params.movie?.title,
            poster_url: route.params.movie?.poster_url,
            release_date: route.params.movie?.release_date,
            director: route.params.movie?.director,
            genre: route.params.movie?.genre,
            cast: route.params.movie?.cast,
            rating: route.params.movie?.rating,
        }));


        const backButtonHandler = () => {
            navigation.navigate('HomeScreen');
        };

        const gotoNotification = () => {

            navigation.navigate('Notification');
        };

        navigation.setOptions({
            title: ``,
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

    const handleTabClick = (tabName: string) => {
        setActiveTab(tabName);
    };

    const headerContent = () => {
        return <>
            <View style={styles.header}>
                {detailData.poster_url &&
                    <FastImage
                        style={styles.img}
                        source={MovieImageMap[detailData.poster_url]}
                    />
                }
            </View>

            <View style={styles.detailText}>
                <Text style={styles.detailHeading}>{detailData.title}</Text>
                <View style={styles.ratingWrapper}>
                    <AirbnbRating
                        count={10}
                        reviews={["Bad", "Meh", "OK", "Good", "Jesus"]}
                        defaultRating={detailData.rating}
                        size={16}
                        showRating={false}
                        isDisabled={true}
                    />
                </View>
            </View>

            <View style={styles.genreWrapper}>
                {detailData.genre?.split(',').map((genre, index) => (
                    <View key={index} style={styles.genreItem}>
                        <Text style={styles.genreText}>{genre}{(detailData.genre?.split(',').length as number) - 1 > index ? ',' : ''}</Text>
                    </View>
                ))}

                <Text style={{ color: 'red' }}>{ }</Text>
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
                <TouchableOpacity onPress={handleTabClick.bind(null, 'synopsis')}>
                    <View style={styles.castReviewText}><Text style={[styles.crText, activeTab === 'synopsis' && styles.crTextActive]}>Synopsis & Cast </Text></View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleTabClick.bind(null, 'reviews')}>
                    <View style={styles.castReviewText}><Text style={[styles.crText, activeTab === 'reviews' && styles.crTextActive]}>Reviews</Text></View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleTabClick.bind(null, 'writeReview')}>
                    <View style={[styles.castReviewText]}><Text style={[styles.crText, activeTab === 'writeReview' && styles.crTextActive]}>Write Review</Text></View>
                </TouchableOpacity>
            </View>
        </>
    }

    return (
        <KeyboardAvoidingView enabled={true} behavior='padding' style={styles.container}>

            {activeTab === 'synopsis' &&
                <FlatList
                    ListHeaderComponent={() => (
                        headerContent()
                    )}
                    data={detailData.cast}
                    renderItem={({ item }) => <CastItem item={item} />}
                    keyExtractor={(item) => item._id}
                    contentContainerStyle={styles.container}
                    numColumns={3}
                />
            }

            {activeTab === 'reviews' &&
                <FlatList
                    ListHeaderComponent={() => (
                        headerContent()
                    )}
                    data={detailData.cast}
                    renderItem={({ item }) => <ReviewList movieItem={route.params.movie} />}
                    keyExtractor={(item) => item._id}
                />
            }

            {activeTab === 'writeReview' &&
                <ScrollView>
                    {headerContent()}
                    <ReviewForm movieItem={route.params.movie} />
                </ScrollView>
            }

            {/*{activeTab === 'synopsis' && <CastList castList={detailData.cast} />}
            {activeTab === 'reviews' && <ReviewList movieItem={route.params.movie} />}
            {activeTab === 'writeReview' && <ReviewForm movieItem={route.params.movie} />} */}

        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        width: '100%',
        height: 200,
        paddingHorizontal: 0
    },
    img: {
        width: '100%',
        height: 200,
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
        paddingVertical: 1,
        borderColor: Colors.whiteColor,
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
