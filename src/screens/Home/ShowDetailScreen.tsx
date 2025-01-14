import * as React from 'react';
import { View, ScrollView, KeyboardAvoidingView, Alert, StyleSheet, Text, TouchableOpacity, FlatList, Image, Pressable, Modal, Platform } from 'react-native';
import { useRoute, useNavigation, ParamListBase, NavigationProp, RouteProp, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../styles/Colors';
import { MovieItem } from '../../types/Movie';
import { convertTimeFormat, formatDate, hitSlops, truncateText } from '../../utils/Common';
import Fonts from '../../styles/Fonts';
import { AirbnbRating } from 'react-native-ratings';
import FastImage from 'react-native-fast-image';
import { API_URL } from '../../configure/config.ios';
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
import CustomButton from '../../components/Ui/CustomButton';
import ShowReviewFormModal from '../../components/ReviewForm/ShowReviewFormModal';

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

    const [isExpandedDescription, setIsExpandedDescription] = React.useState(false);

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
                return <Pressable onPress={backButtonHandler}>
                    {Platform.OS === 'android' && <FastImage style={styles.backBtn} source={require('../../assets/images/icons/back-w.png')} />}
                    {Platform.OS === 'ios' && <View style={styles.iosBackBtnWrapper}>
                        <FastImage style={[styles.iosBackBtnImg]} source={require('../../assets/images/icons/back-w-1.png')} />
                        <Text style={[styles.iosBackBtnText]}>  Back</Text>
                    </View>}
                </Pressable>
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
            banner_url: route.params.showItem?.banner_url,
            poster_url: route.params.showItem?.poster_url,
            release_date: route.params.showItem?.release_date,
            director: route.params.showItem?.director,
            writer: route.params.showItem?.writer,
            genre: route.params.showItem?.genre,
            cast: route.params.showItem?.cast,
            rating: route.params.showItem?.rating,
            runtime: route.params.showItem?.runtime,
            description: route.params.showItem?.description
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
        scrollView: {
            flexGrow: 1
        },
        readMoreContainer: {
            width: '100%'
        },
        readMoreButton: {

        },
        readMoreText: {
            color: Colors.tabActiveColor,
            fontFamily: Fonts.Family.Medium,
            fontSize: Fonts.Size.Small
        },
        iosBackBtnText: {
            color: Colors.whiteColor
        },
        iosBackBtnWrapper: {
            flexDirection: 'row',
            alignItems: 'center'
        },
        iosBackBtnImg: {
            width: 8,
            height: 15,
        },
        backBtn: {
            width: 35,
            height: 35,
            marginBottom: 20
        },
        withoutLoginWrapper: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '20%',
            paddingHorizontal: 15
        },

        modalContainer: {
            flex: 1,
            backgroundColor: Colors.backgroundColorShadow,
            justifyContent: "center",
            alignItems: "center",
        },
        closeArea: {
            flex: 1,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
        },
        fullImage: {
            width: imageSize.width,
            height: imageSize.height
        },

        container: {
            flex: 1,
        },
        reviewListContainer: {
            paddingHorizontal: 20
        },
        noReviewWrapper: {
            flex: 1,
        },
        reviewText: {
            color: Colors.whiteColor,
            textAlign: 'center'
        },
        ratingTextWrapper: {
            flexDirection: 'row',
            alignItems: 'flex-end'
        },
        ratingText: {
            color: Colors.whiteColor,
            fontSize: Fonts.Size.Medium + 5,
            fontWeight: '600',
            paddingLeft: 5
        },
        ratingSlash: {
            color: Colors.whiteColor,
            marginHorizontal: 2
        },
        totalRatingText: {
            color: Colors.tabBgColor,
            fontSize: Fonts.Size.Small,
            fontWeight: '500'
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
            color: Colors.tabActiveColor,
            fontFamily: Fonts.Family.Bold,
            fontSize: Fonts.Size.Medium + 1,
            textTransform: 'uppercase',
            marginBottom: 2
        },
        ratingWrapper: {
            paddingVertical: 0,
            alignItems: 'center',
            flexDirection: 'row',
        },
        genreWrapper: {
            flexDirection: 'row',
            paddingHorizontal: 15
        },
        genreItem: {
            paddingVertical: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.tagBgColor,
            borderWidth: 1,
            borderColor: Colors.tagBorderColor,
            borderRadius: 50,
            marginRight: 5,
            paddingHorizontal: 10,
            paddingBottom: 2,
            paddingTop: 0
        },
        genreText: {
            color: Colors.whiteColor,
            fontFamily: Fonts.Family.Medium
        },
        releaseWrapper: {
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            flexDirection: 'row'
        },
        spaceBetween: {
            color: Colors.whiteColor,
            paddingHorizontal: 5,
            fontSize: Fonts.Size.XXX_Large,
            lineHeight: 22
        },
        releaseText: {
            color: Colors.whiteColor,
            fontFamily: Fonts.Family.Medium
        },
        aboveDirectorSpace: {
            marginTop: 10
        },
        directorWrapper: {
            marginTop: 3,
            paddingHorizontal: 15,
            alignItems: 'flex-start',
            justifyContent: 'flex-start'
        },
        directorItem: {
            // justifyContent: 'center',
            // alignItems: 'center'
            width: '100%'
        },
        directorText: {
            color: Colors.whiteColor,
            fontFamily: Fonts.Family.Medium
        },
        descriptionText: {
            color: Colors.textInputDisabled,
            fontSize: Fonts.Size.Small
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
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderRadius: 50,
            position: 'relative'
        },
        crText: {
            fontSize: Fonts.Size.Medium,
            color: Colors.tabBgColor,
            fontWeight: '500'
        },
        totalReviewWrapper: {
            position: 'absolute',
            borderRadius: 20,
            width: 20,
            height: 20,
            left: 65,
            bottom: 15,
            backgroundColor: Colors.tabActiveColor,
            justifyContent: 'center'
        },
        totalReview: {
            color: Colors.blackColor,
            textAlign: 'center',
            fontFamily: Fonts.Family.Light,
            fontSize: Fonts.Size.Small - 4
        },
        crTextActive: {
            color: Colors.whiteColor,
        }
    });

    const headerContent = () => {
        return <>

            <View style={styles.header}>
                {detailData.banner_url &&
                    <Pressable onPress={() => openModal(detailData.banner_url!)}>
                        <FastImage style={styles.img} source={{ uri: detailData.banner_url }} />
                    </Pressable>
                }
            </View>

            <View style={styles.detailText}>
                <Text style={styles.detailHeading}>{detailData.title}</Text>

                <View style={styles.releaseWrapper}>
                    <Text style={styles.releaseText}>{detailData.release_date ? formatDate(new Date(detailData.release_date), 'Month YYYY') : '----'}</Text>
                    {detailData.runtime && <Text style={[styles.releaseText, styles.spaceBetween]}>.</Text>}
                    {detailData.runtime && <Text style={styles.releaseText}>{convertTimeFormat(detailData.runtime)}</Text>}
                </View>

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

            {/* <View style={styles.genreWrapper}>
                {detailData.genre?.split(',').map((genre, index) => (
                    <View key={index} style={styles.genreItem}>
                        <Text style={styles.genreText}>{genre}{(detailData.genre?.split(',').length as number) - 1 > index ? ',' : ''}</Text>
                    </View>
                ))}
            </View> */}

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.genreWrapper}
            >
                {detailData.genre?.split(',').map((genre, index) => (
                    <View key={index} style={styles.genreItem}>
                        <Text style={styles.genreText}>{genre.trim()}</Text>
                    </View>
                ))}
            </ScrollView>

            <View style={styles.directorWrapper}>
                <View style={styles.directorItem}><Text style={styles.directorText}>Director: {detailData.director}</Text></View>
            </View>

            <View style={styles.directorWrapper}>
                <View style={styles.directorItem}><Text style={styles.directorText}>Writer: {detailData.writer}</Text></View>
            </View>

            {/* <View style={styles.directorWrapper}>
                <View style={styles.directorItem}><Text style={[styles.directorText, styles.descriptionText]}>Description: {detailData.description}</Text></View>
            </View> */}

            {detailData.director && <View style={styles.directorWrapper}>
                <View style={styles.directorItem}>
                    {detailData.description && detailData.description.length > 40 && (
                        <View style={styles.readMoreContainer}>
                            <TouchableOpacity onPress={() => setIsExpandedDescription(!isExpandedDescription)} style={styles.readMoreButton}>
                                <Text style={styles.directorText}>
                                    Synopsis: {isExpandedDescription ? detailData.description : truncateText(detailData.description!, 40)}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>}

            <View style={styles.hrWrapper}>
                <View style={styles.hr}></View>
            </View>

            <View style={styles.castReviewBtnWrapper}>
                <TouchableOpacity onPress={handleTabClick.bind(null, 'synopsis')} hitSlop={hitSlops()}>
                    <View style={styles.castReviewText}><Text style={[styles.crText, activeTab === 'synopsis' && styles.crTextActive]}>Cast </Text></View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleTabClick.bind(null, 'reviews')}>
                    <View style={styles.castReviewText}><Text style={[styles.crText, activeTab === 'reviews' && styles.crTextActive]}>Reviews</Text></View>
                    <View style={styles.totalReviewWrapper}><Text style={styles.totalReview}>{reviewListByShow.length}</Text></View>
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
                                renderItem={({ item }) => <View style={styles.reviewListContainer}><ShowReviewItem item={item} showId={route.params.showItem?._id} /></View>}
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
                            {/* {userDetail.role !== 'guest' && <ShowReviewForm showItem={route.params.showItem}  onPress={onReviewPressHandler} />} */}
                            {userDetail.role !== 'guest' && <ShowReviewFormModal showItem={route.params.showItem} cancel={() => setActiveTab('reviews')} visible={true} />}
                            {userDetail.role === 'guest' &&
                                <View style={[styles.withoutLoginWrapper]}>
                                    <CustomButton
                                        text={'Login'}
                                        onPressHandler={navigationHandler}
                                        textSize={20}
                                    />
                                </View>
                            }
                        </ScrollView>
                    </React.Suspense>
                }

            </KeyboardAvoidingView>

            {detailData.banner_url &&
                <Modal visible={isModalVisible} transparent={true}>
                    <View style={styles.modalContainer}>
                        <Pressable style={styles.closeArea} onPress={closeModal}>
                            <FastImage
                                style={styles.fullImage}
                                source={{ uri: detailData.banner_url }}
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
