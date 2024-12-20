import * as React from 'react';
import { View, ScrollView, KeyboardAvoidingView, Alert, StyleSheet, Text, TouchableOpacity, FlatList, Image, Pressable, Modal, Platform } from 'react-native';
import { useRoute, useNavigation, ParamListBase, NavigationProp, RouteProp, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../styles/Colors';
import { MovieItem } from '../../types/Movie';
import { formatDate, hitSlops } from '../../utils/Common';
import Fonts from '../../styles/Fonts';
import { AirbnbRating } from 'react-native-ratings';
import FastImage from 'react-native-fast-image';
import { API_URL } from '../../configure/config.android';
import { useAuth } from '../../context/AuthContext';
import { Review } from '../../models/Review';
import ReviewItem from '../../components/ReviewList/ReviewItem';

import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store/index';
import { fetchReviewListByMovie } from '../../store/slices/reviewListByMoviewSlice';
import CustomButton from '../../components/Ui/CustomButton';

const CastItem = React.lazy(() => import('../../components/CastList/CastItem'));
const ReviewForm = React.lazy(() => import('../../components/ReviewForm/ReviewForm'));
const Loading = React.lazy(() => import('../../components/Loading/Loading'));

interface ListItem {
    id: string;
    name: string;
}


const DetailScreen: React.FC = () => {

    const { user, userDetail, logout } = useAuth();
    const navigation: NavigationProp<ParamListBase> = useNavigation();
    const route: RouteProp<{ params: { movie: MovieItem } }> = useRoute();
    const [detailData, setDetailData] = React.useState<Partial<MovieItem>>({});
    const [activeTab, setActiveTab] = React.useState('reviews');
    const [rating, setRating] = React.useState(0);

    const [isModalVisible, setModalVisible] = React.useState(false);
    const [imageSize, setImageSize] = React.useState({ width: 0, height: 0 });

    const { data: reviewListByMovie } = useSelector((state: RootState) => state.reviewListByMovie);   
    const dispatch = useAppDispatch();

    const abortController = new AbortController();
    const signal = abortController.signal;

    const getReviewListByUser = async () => {

        const url = `${API_URL}review/movie-rating/${route.params.movie?._id}`;
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

            if (result.status === 'success') {
                setRating(+result.data.toFixed(1))
            }
        } catch (error) {
            if (error instanceof Error) {
                if (error.name === 'AbortError') {
                    //
                }
            }
        }
    };

    const backButtonHandler = () => {
        navigation.navigate('HomeScreen');
    };

    const gotoNotification = () => {
        navigation.navigate('Notification');
    };

    const loadHeaderContent = () => {
        navigation.setOptions({
            title: ``,
            headerLeft: () => {
                return Platform.OS === 'android' ?
                            <Icon name={'chevron-back'} size={30} color={Colors.whiteColor} onPress={backButtonHandler} /> :
                            <Pressable onPress={backButtonHandler}>
                                <FastImage style={styles.backBtn} source={require('../../assets/images/icons/back-w.png')} />
                            </Pressable>
            },
            headerRight: () => {
                // return <Icon name={'notifications'} size={25} color={Colors.tabActiveColor} onPress={gotoNotification} />
                return ''
            }
        });
    };

    const getReviewListByMovie = async () => {
        dispatch(fetchReviewListByMovie({ url: `${API_URL}review/movie/${route.params.movie._id}`, token: user?.token! }));       
    };

    useFocusEffect(
        React.useCallback(() => {
            getReviewListByMovie();
            return () => console.log('');
        }, []) 
    );

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

        loadHeaderContent();
        getReviewListByUser();
        
        return () => {
            abortController.abort();
        };

    }, [activeTab]);

    const handleTabClick = (tabName: string) => {
        setActiveTab(tabName);
    };

    const styles = StyleSheet.create({
        backBtn: {
            width:35, 
            height:35, 
            marginBottom:20
        },
      withoutLoginWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20%',
        paddingHorizontal:15
      },
      
      modalContainer: {
        flex: 1,
        backgroundColor: Colors.backgroundColorShadow,
        justifyContent: 'center',
        alignItems: 'center',
      },
      closeArea: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      },
      fullImage: {
        width: imageSize.width,
        height: imageSize.height,
      },

      container: {
        flex: 1,
      },
      reviewListContainer: {
        paddingHorizontal: 20,
      },
      noReviewWrapper: {
        flex: 1,
      },
      reviewText: {
        color: Colors.whiteColor,
        textAlign: 'center',
      },
      ratingTextWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-end',
      },
      ratingText: {
        color: Colors.whiteColor,
        fontSize: Fonts.Size.Medium + 5,
        fontWeight: '600',
        paddingLeft: 5,
      },
      ratingSlash: {
        color: Colors.whiteColor,
        marginHorizontal: 2,
      },
      totalRatingText: {
        color: Colors.tabBgColor,
        fontSize: Fonts.Size.Small,
        fontWeight: '500',
      },
      header: {
        width: '100%',
        height: 200,
        paddingHorizontal: 0,
      },
      img: {
        width: '100%',
        height: 200,
        flexGrow: 1,
      },
      detailText: {
        paddingVertical: 10,
        paddingHorizontal: 15,
      },
      detailHeading: {
        color: Colors.whiteColor,
        fontFamily: Fonts.Family.Bold,
        fontSize: Fonts.Size.Medium + 1,
        textTransform: 'uppercase',
      },
      ratingWrapper: {
        paddingVertical: 0,
        alignItems: 'center',
        flexDirection: 'row',
      },
      genreWrapper: {
        flexDirection: 'row',
        paddingHorizontal: 15,
      },
      genreItem: {
        paddingVertical: 1,            
            justifyContent: 'center',
            alignItems: 'center', 
            backgroundColor: Colors.tagBgColor,            
            borderWidth:1,
            borderColor:Colors.tagBorderColor, 
            borderRadius: 50,
            marginRight:5,            
            paddingHorizontal: 10,
            paddingBottom:2, 
            paddingTop:0
      },
      genreText: {
        color: Colors.whiteColor,
        fontFamily: Fonts.Family.Medium,
      },
      releaseWrapper: {
        paddingHorizontal: 15,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
      },
      releaseItem: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      releaseText: {
        color: Colors.whiteColor,
        fontFamily: Fonts.Family.Medium,
      },
      directorWrapper: {
        marginTop: 0,
        paddingHorizontal: 15,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
      },
      directorItem: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      directorText: {
        color: Colors.whiteColor,
        fontFamily: Fonts.Family.Medium,
      },
      editableRating: {
        width: '100%',
        paddingTop: 25,
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
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 50,
      },
      crText: {
        fontSize: Fonts.Size.Medium,
        color: Colors.tabBgColor,
        fontWeight: '500',
      },

      crTextActive: {
        color: Colors.whiteColor,
      },
    });

    const openModal = (url: string) => {                   
        setModalVisible(true);              
        url ? Image.getSize(url, (width, height) => setImageSize({ width, height }), (error) => console.error("Failed to get image size:", error)) : Alert.alert("Error", "Image URI not found.");
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const headerContent = () => {
        return <>            
            <View style={styles.header}>
                {detailData.poster_url &&                      
                    <Pressable onPress={() => openModal(detailData.poster_url!)}>
                        <FastImage style={styles.img} source={{uri: detailData.poster_url}} />
                    </Pressable>                                       
                }
            </View>

            <View style={styles.detailText}>
                <Text style={styles.detailHeading}>{detailData.title}</Text>
                <View style={styles.ratingWrapper}>
                    <AirbnbRating
                        count={1}
                        reviews={["Bad", "Meh", "OK", "Good", "Jesus"]}
                        defaultRating={rating}
                        size={25}
                        showRating={false}
                        isDisabled={true}
                    />
                    <View style={styles.ratingTextWrapper}>
                        <Text style={styles.ratingText}>{rating}</Text>
                        <Text style={styles.ratingSlash}>/</Text>
                        <Text style={styles.totalRatingText}>5</Text>
                    </View>
                </View>
            </View>

            <View style={styles.genreWrapper}>
                {detailData.genre?.split(',').map((genre, index) => (
                    <View key={index} style={styles.genreItem}>
                        <Text style={styles.genreText}>{genre}{(detailData.genre?.split(',').length as number) - 1 > index ? ',' : ''}</Text>
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
                <TouchableOpacity onPress={handleTabClick.bind(null, 'synopsis')} hitSlop={hitSlops()}>
                    <View style={styles.castReviewText}><Text style={[styles.crText, activeTab === 'synopsis' && styles.crTextActive]}>Cast </Text></View>
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

    const onReviewPressHandler = (str: string) => {
        setActiveTab(str);
    };

    const navigationHandler = () => {
        logout();
    };

    return (
        <>
            <KeyboardAvoidingView enabled={true} behavior='padding' style={styles.container}>

                {activeTab === 'synopsis' &&
                    <React.Suspense fallback={<Loading />}>
                        <FlatList
                            ListHeaderComponent={() => (
                                headerContent()
                            )}
                            data={detailData.cast}
                            renderItem={({ item }) => <CastItem item={item} />}
                            keyExtractor={(item) => item._id}
                            numColumns={3}
                        />
                    </React.Suspense>
                }

                {activeTab === 'reviews' &&
                    <>                    
                        {reviewListByMovie.length > 0 &&
                            <FlatList
                                ListHeaderComponent={() => (
                                    headerContent()
                                )}
                                data={reviewListByMovie}
                                renderItem={({ item }) => <View style={styles.reviewListContainer}><ReviewItem item={item} /></View>}
                                keyExtractor={(item) => item._id}
                            />
                        }

                        {reviewListByMovie.length === 0 &&
                            <View style={styles.noReviewWrapper}>
                                {headerContent()}
                                <Text style={styles.reviewText}>No Review found</Text>
                            </View>
                        }
                    </>
                }

                {activeTab === 'writeReview' &&
                    <React.Suspense fallback={<Loading />}>
                        <ScrollView>
                            {headerContent()}
                            {userDetail.role !== 'guest' &&  <ReviewForm movieItem={route.params.movie} onPress={onReviewPressHandler} />}
                            {userDetail.role === 'guest' && 
                                <View style={styles.withoutLoginWrapper}>                                    
                                    <CustomButton
                                      text={'Please Login'}
                                      onPressHandler={navigationHandler}
                                      textSize={20}                
                                    />
                                </View>
                            }
                        </ScrollView>
                    </React.Suspense>
                }
            </KeyboardAvoidingView>

            {detailData.poster_url &&
            <Modal visible={isModalVisible} transparent={true}>
                <View style={styles.modalContainer}>
                    <Pressable style={styles.closeArea} onPress={closeModal}>
                        <FastImage
                            style={styles.fullImage}                                
                            source={{uri:detailData.poster_url}}
                            resizeMode="cover"
                        />
                    </Pressable>
                </View>
            </Modal>
        }

        </>
    );
};



export default DetailScreen;
