import * as React from 'react';
import { View, StyleSheet, ScrollView, Pressable, PressableProps } from 'react-native';
import Colors from '../../styles/Colors';
import { useAuth } from '../../context/AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fonts from '../../styles/Fonts';
import { capitalizeFirstLetter } from '../../utils/Common';
import { API_URL } from '../../configure/config.android';
import { Text } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';

const AlertDialog = React.lazy(() => import('../../components/AlertDialog/AlertDialog'));
const CustomButton = React.lazy(() => import('../../components/Ui/CustomButton'));
const UserProfileForm = React.lazy(() => import('../../components/UserProfileForm/UserProfileForm'));

type Props = {
    navigation: any;
    route: any;
};

const HomeScreen: React.FC<Props> = ({ navigation, route }) => {


    const { user, logout, userDetail, counter } = useAuth();
    const [followData, setFollowData] = React.useState({ followers: 0, following: 0 });
    const [moviesReviewed, setMoviesReviewed] = React.useState(0);

    const [dialogVisible, setDialogVisible] = React.useState<boolean>(false);
    const cancelDialog = () => setDialogVisible(false);
    const [isEditMode, setIsEditMode] = React.useState<boolean>(false);

    const signOutDialog = () => {
        logout();
        setDialogVisible(false)
    };

    const abortController = new AbortController();
    const signal = abortController.signal;

    const gotoScreen = (screen: string) => {
        navigation.navigate(screen);
    };

    const gotoTabScreen = (tab: string, screen: string) => {
        navigation.navigate(tab, { screen: screen });
    };

    const onLogoutHandler = () => {
        setDialogVisible(true);
    };

    const onRatingReviewHandler = (event: PressableProps) => {

    };

    const onFavouriteHandler = (event: PressableProps) => {

    };

    const onBookmarkHandler = (event: PressableProps) => {
    };

    const getFollowingCount = async () => {

        const url = `${API_URL}follower/${userDetail._id}`;
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
            // console.log('follower', result.data.length)

            if (result.status === 'success') {
                setFollowData((prevState) => ({
                    ...prevState,
                    following: result.data.length
                }));
            }
        } catch (error) {
            if (error instanceof Error) {
                if (error.name === 'AbortError') {

                } else {

                }
            } else {

            }
        }
    };

    const getFollowerCount = async () => {

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
            console.log('following', result.data.length);

            if (result.status === 'success') {
                setFollowData((prevState) => ({
                    ...prevState,
                    followers: result.data.length
                }));
            }
        } catch (error) {
            if (error instanceof Error) {
                if (error.name === 'AbortError') {

                } else {

                }
            } else {

            }
        }
    };

    const getReviewListByUser = async () => {

        const movieUrl = `${API_URL}review/user/${userDetail?._id}`;
        const showUrl = `${API_URL}review-show/user/${userDetail?._id}`;
        const token = user;
        const headers = {
            'Authorization': `Bearer ${token?.token}`,
            'Content-Type': 'application/json'
        }

        try {

            const response = await fetch(movieUrl, {
                method: 'GET',
                headers: {
                    ...headers
                },
                signal: signal
            });

            const [movieResponse, showResponse] = await Promise.all([
                fetch(movieUrl, { method: 'GET', headers: { ...headers }, signal: signal }),
                fetch(showUrl, { method: 'GET', headers: { ...headers }, signal: signal }),
            ]);

            const movieData = await movieResponse.json();
            const showData = await showResponse.json();

            if (movieData.status === 'success' && showData.status === 'success') {
                const movieCount = movieData.data.reviews.length;
                const showCount = showData.data.reviews.length;
                setMoviesReviewed((movieCount + showCount));
            }


        } catch (error) {
            if (error instanceof Error) {
                if (error.name === 'AbortError') {
                    //
                }
            }
        }
    };


    React.useLayoutEffect(() => {

        getFollowerCount();
        getFollowingCount();
        getReviewListByUser();

        return () => {
            abortController.abort();
        }
    }, [counter, route]);

    const editHandler = () => {
        setIsEditMode(true);
    };

    const onEditCancelHandler = (bool: boolean) => {
        setIsEditMode(bool);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.innerContainer}>
                {
                    !isEditMode &&
                    <>
                        <View style={styles.editWrapper}>
                            <Feather name={'edit'} size={25} color={styles.editIcon.color} onPress={editHandler} />
                        </View>
                        <View style={styles.header}>
                            <View style={styles.headerContent}>
                                <View style={styles.userTextIcon}>
                                    <View style={styles.userIcon}>
                                        <Icon name={'user-alt'} size={45} color={Colors.tabBgColor} onPress={() => { }} style={styles.icon} />
                                    </View>
                                    <View style={styles.userTextWrapper}>
                                        {/* <Text style={styles.name}>{capitalizeFirstLetter(user?.username!)}</Text> */}
                                        <Text style={styles.name}>{capitalizeFirstLetter(userDetail.firstname)}</Text>
                                        {userDetail.biography && <Text style={styles.critic}>{userDetail.biography}</Text>}
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={styles.followerWrapper}>
                            <Pressable onPress={gotoTabScreen.bind(null, 'MyReview', 'HomeScreen')}>
                                <View style={styles.movies}>
                                    <Text style={styles.follText}>{moviesReviewed}</Text>
                                    <Text style={styles.follText}>Reviews</Text>
                                </View>
                            </Pressable>

                            <Pressable onPress={gotoScreen.bind(null, 'FollowerScreen')}>
                                <View style={styles.followers}>
                                    <Text style={styles.follText}>{followData.followers}</Text>
                                    <Text style={styles.follText}>Followers</Text>
                                </View>
                            </Pressable>

                            <Pressable onPress={gotoScreen.bind(null, 'FollowingScreen')}>
                                <View style={styles.following}>
                                    <Text style={styles.follText}>{followData.following}</Text>
                                    <Text style={styles.follText}>Followings</Text>
                                </View>
                            </Pressable>

                        </View>

                        <View style={styles.myMoviesWrapper}>
                            <View style={styles.hr}></View>
                            <View style={styles.footerWrapper}>
                                <Pressable style={[styles.footerItem, { display: 'none' }]} onPress={onRatingReviewHandler}>
                                    <Icon name={'star'} style={styles.footerIcon} />
                                    <Text style={styles.footerText}>Ratings and Reviews</Text>
                                </Pressable>
                                <Pressable style={[styles.footerItem, { display: 'none' }]} onPress={onFavouriteHandler}>
                                    <Icon name={'heart'} style={styles.footerIcon} />
                                    <Text style={styles.footerText}>Favorite Films</Text>
                                </Pressable>
                                <Pressable style={[styles.footerItem, { display: 'none' }]} onPress={onBookmarkHandler}>
                                    <Icon name={'bookmark'} style={styles.footerIcon} />
                                    <Text style={styles.footerText}>Want to Watch</Text>
                                </Pressable>

                                <CustomButton text={'Logout'} onPressHandler={onLogoutHandler} textSize={20} />

                                {/* <Pressable style={styles.footerItem} onPress={onLogoutHandler}>
                                    <MaterialIcon name={'logout'} style={styles.footerIcon} />
                                    <Text style={styles.footerText}>Logout</Text>
                                </Pressable> */}

                                {/* <Pressable style={styles.footerItem} onPress={gotoTabScreen.bind(null, 'MyReview', 'HomeScreen')}>
                                    <AntDesign name={'logout'} style={styles.footerIcon} />
                                    <Text style={styles.footerText}>Test</Text>
                                </Pressable> */}

                                {/* <View style={styles.spacer}></View>

                                <Pressable style={styles.footerItem} onPress={() => navigation.navigate('TestScreen')}>
                                    <AntDesign name={'logout'} style={styles.footerIcon} />
                                    <Text style={styles.footerText}>Test</Text>
                                </Pressable> */}


                            </View>
                        </View>
                    </>
                }

                {isEditMode && <UserProfileForm onCancel={onEditCancelHandler} />}
                <AlertDialog visible={dialogVisible} signOut={signOutDialog} cancelLogout={cancelDialog} title={'Are you sure want to logout?'} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerContainer: {
        flex: 1,
    },
    editWrapper: {
        paddingTop: 30,
        paddingHorizontal: 30,
        alignItems: 'flex-end'
    },
    editIcon: {
        color: Colors.whiteColor
    },
    header: {
        width: '100%',
        minHeight: 200,
        justifyContent: 'center',
        alignContent: 'center',
        flexWrap: 'wrap',
    },
    headerContent: {
        width: 200,
        minHeight: 200,
        justifyContent: 'center',
        alignContent: 'center',
        flexWrap: 'wrap',
    },
    userTextIcon: {
        width: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        flexWrap: 'wrap',
        flexDirection: 'row'
    },
    userIcon: {
        backgroundColor: Colors.whiteColor,
        width: 80,
        height: 80,
        borderRadius: 80,
        justifyContent: 'center'
    },
    icon: {
        textAlign: 'center'
    },
    userTextWrapper: {
        width: '100%',
        height: 50,
    },
    name: {
        marginTop: 10,
        color: Colors.whiteColor,
        textAlign: 'center',
        fontFamily: Fonts.Family.Bold,
        fontSize: Fonts.Size.Medium + 10,
        lineHeight: 30
    },
    critic: {
        color: Colors.whiteColor,
        textAlign: 'center',
        fontFamily: Fonts.Family.Medium,
        fontSize: Fonts.Size.Medium + 2,
        lineHeight: 25
    },
    followerWrapper: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    movies: {
        marginRight: 15,
        borderRightColor: Colors.whiteColor,
        padding: 15,
    },
    followers: {
        marginRight: 15,
        borderRightColor: Colors.whiteColor,
        padding: 15
    },
    following: {
        padding: 15
    },
    follText: {
        textAlign: 'center',
        fontFamily: Fonts.Family.Medium,
        fontSize: Fonts.Size.Medium,
        color: Colors.whiteColor
    },
    myMoviesWrapper: {
        width: '100%',
        minHeight: 200,
        paddingHorizontal: 30
    },
    movieHeaderText: {
        paddingTop: 20,
        fontFamily: Fonts.Family.Bold,
        fontSize: Fonts.Size.Medium + 2,
        color: Colors.whiteColor
    },
    hr: {
        marginTop: 10,
        marginBottom: 10,
        width: '100%',
        minHeight: 2,
        backgroundColor: Colors.tabBgColor,
        borderRadius: 50
    },
    footerWrapper: {
        paddingTop: 25
    },
    footerItem: {
        flexWrap: 'nowrap',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    footerIcon: {
        color: Colors.tabActiveColor,
        fontSize: Fonts.Size.XX_Large,
        width: 40,
        textAlign: 'center',
        marginBottom: 20
    },
    footerText: {
        color: Colors.whiteColor,
        paddingLeft: 15,
        paddingTop: 5
    },
    spacer: {
        padding: 15
    }

});

export default React.memo(HomeScreen);
