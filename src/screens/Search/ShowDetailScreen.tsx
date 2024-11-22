import * as React from 'react';
import { View, ScrollView, KeyboardAvoidingView, Alert, StyleSheet, Text, TouchableOpacity, FlatList, Modal, Pressable, Image } from 'react-native';
import { useRoute, useNavigation, ParamListBase, NavigationProp, RouteProp, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../styles/Colors';
import { formatDate, hitSlops } from '../../utils/Common';
import Fonts from '../../styles/Fonts';
import { AirbnbRating } from 'react-native-ratings';
import FastImage from 'react-native-fast-image';

import { API_URL } from '../../configure/config.android';
import { useAuth } from '../../context/AuthContext';
import { ShowItem } from '../../types/Show';
import ShowReviewItem from '../../components/ReviewList/ShowReviewItem';

const CastItem = React.lazy(() => import('../../components/CastList/CastItem'));
const ShowReviewList = React.lazy(() => import('../../components/ReviewList/ShowReviewList'));
const ShowReviewForm = React.lazy(() => import('../../components/ReviewForm/ShowReviewForm'));
const Loading = React.lazy(() => import('../../components/Loading/Loading'));

import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store/index';
import { fetchReviewListByShow } from '../../store/slices/reviewListByShowSlice';

interface ListItem {
    id: string;
    name: string;
}


const ShowDetailScreen: React.FC = () => {

    const { user, userDetail, logout } = useAuth();
    const navigation: NavigationProp<ParamListBase> = useNavigation();
    const route: RouteProp<{ params: { showItem: ShowItem } }> = useRoute();
    const [detailData, setDetailData] = React.useState<Partial<ShowItem>>({});
    const [activeTab, setActiveTab] = React.useState('synopsis');
    const [rating, setRating] = React.useState(0);

    const [isModalVisible, setModalVisible] = React.useState(false);
    const [imageSize, setImageSize] = React.useState({ width: 0, height: 0 });

    const { data: reviewListByShow } = useSelector((state: RootState) => state.reviewListByShow);   
    const dispatch = useAppDispatch();

    const abortController = new AbortController();
    const signal = abortController.signal;

    const getReviewListByUser = async () => {

        const url = `${API_URL}review-show/show-rating/${route.params.showItem?._id}`;
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
                return <Icon name={'chevron-back'} size={30} color={Colors.whiteColor} onPress={backButtonHandler} />
            },
            headerRight: () => {
                // return <Icon name={'notifications'} size={25} color={Colors.tabActiveColor} onPress={gotoNotification} />
                return ''
            }
        });
    };

    const getReviewListByShow = async () => {
        dispatch(fetchReviewListByShow({ url: `${API_URL}review-show/show/${route.params.showItem._id}`, token: user?.token! }));   
    };

    useFocusEffect(
        React.useCallback(() => {
            getReviewListByShow();
            return () => {            
            };
        }, []) 
    );

    React.useLayoutEffect(() => {
        setDetailData(prevState => ({
            ...prevState,
            id: route.params.showItem?._id,
            title: route.params.showItem?.title,
            poster_url: route.params.showItem?.poster_url,
            release_date: route.params.showItem?.release_date,
            director: route.params.showItem?.director,
            genre: route.params.showItem?.genre,
            cast: route.params.showItem?.cast,
            rating: route.params.showItem?.rating,
        }));



        loadHeaderContent();
        getReviewListByUser();
        //getReviewListByShow();

        return () => {
            abortController.abort();
        };

    }, [activeTab]);

    const handleTabClick = (tabName: string) => {
        setActiveTab(tabName);
    };

    const openModal = (url: string) => {                   
        setModalVisible(true);              
        url ? Image.getSize(url, (width, height) => setImageSize({ width, height }), (error) => console.error("Failed to get image size:", error)) : Alert.alert("Error", "Image URI not found.");
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const styles = StyleSheet.create({
      withoutLoginWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20%',
      },
      pressableBtn: {},
      pressableText: {
        color: Colors.whiteColor,
        fontFamily: Fonts.Family.Bold,
        fontSize: Fonts.Size.Medium + 2,
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
        borderColor: Colors.whiteColor,
        justifyContent: 'center',
        alignItems: 'center',
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
                        {reviewListByShow.length > 0 &&
                            <FlatList
                                ListHeaderComponent={() => (
                                    headerContent()
                                )}
                                data={reviewListByShow}
                                renderItem={({ item }) => <View style={styles.reviewListContainer}><ShowReviewItem item={item} /></View>}
                                keyExtractor={(item) => item._id}
                            />
                        }

                        {reviewListByShow.length === 0 &&
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
                            {userDetail.role !== 'guest' &&  <ShowReviewForm showItem={route.params.showItem} onPress={onReviewPressHandler} />}
                            {userDetail.role === 'guest' && 
                                <View style={styles.withoutLoginWrapper}>
                                    <Pressable style={styles.pressableBtn} onPress={navigationHandler}>
                                        <Text style={styles.pressableText}>Please Login</Text>
                                    </Pressable>
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



export default ShowDetailScreen;
