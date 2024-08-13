import * as React from 'react';
import { View, StyleSheet, ScrollView, Pressable, PressableProps } from 'react-native';
import Colors from '../../styles/Colors';
import { useRoute, useNavigation, ParamListBase, NavigationProp, RouteProp } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Fonts from '../../styles/Fonts';
import { capitalizeFirstLetter } from '../../utils/Common';
import { API_URL } from '../../configure/config.android';
import { Button, Dialog, Portal, PaperProvider, Text } from 'react-native-paper';
import AlertDialog from '../../components/AlertDialog/AlertDialog';


type Props = {

};

const HomeScreen: React.FC<Props> = ({ }) => {


    const { user, logout, userDetail, counter } = useAuth();
    const navigation: NavigationProp<ParamListBase> = useNavigation();
    const route: RouteProp<{ params: { id: string } }> = useRoute();
    const [followData, setFollowData] = React.useState({ followers: 0, following: 0 });
    const [moviesReviewed, setMoviesReviewed] = React.useState(0);

    const [dialogVisible, setDialogVisible] = React.useState<boolean>(false);
    const cancelDialog = () => setDialogVisible(false);
    const signOutDialog = () => {
        logout();
        setDialogVisible(false)
    };

    const abortController = new AbortController();
    const signal = abortController.signal;

    const gotoHandler = () => {
        navigation.navigate('Home', { screen: 'Notification' });
    };

    const onLogoutHandler = (event: PressableProps) => {
        setDialogVisible(true);
        //logout();
    };

    const onRatingReviewHandler = (event: PressableProps) => {

    };

    const onFavouriteHandler = (event: PressableProps) => {

    };

    const onBookmarkHandler = (event: PressableProps) => {
    };

    const getFollowerCount = async () => {

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

    const getFollowingCount = async () => {

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

    const getReviewListByUser = async () => {

        const url = `${API_URL}review/user/${userDetail?._id}`;
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
                setMoviesReviewed(result.data.reviews.length);
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
    }, [counter]);


    return (
        <ScrollView style={styles.container}>

            <View style={styles.headerWrapper}>
                <View style={styles.header}>
                    <View style={styles.headerContent}>
                        <View style={styles.userTextIcon}>
                            <View style={styles.userIcon}>
                                <Icon name={'user-alt'} size={80} color={Colors.tabBgColor} onPress={() => { }} style={styles.icon} />
                            </View>
                            <View style={styles.userTextWrapper}>
                                <Text style={styles.name}>{capitalizeFirstLetter(user?.username!)}</Text>
                                <Text style={styles.critic}>Film Critic</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.followerWrapper}>
                    <View style={styles.movies}>
                        <Text style={styles.follText}>{moviesReviewed}</Text>
                        <Text style={styles.follText}>Movies</Text>
                    </View>
                    <View style={styles.followers}>
                        <Text style={styles.follText}>{followData.followers}</Text>
                        <Text style={styles.follText}>Followers</Text>
                    </View>
                    <View style={styles.following}>
                        <Text style={styles.follText}>{followData.following}</Text>
                        <Text style={styles.follText}>Following</Text>
                    </View>
                </View>
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
                    <Pressable style={styles.footerItem} onPress={onLogoutHandler}>
                        <MaterialIcon name={'logout'} style={styles.footerIcon} />
                        <Text style={styles.footerText}>Logout</Text>
                    </Pressable>
                </View>
            </View>
            <AlertDialog visible={dialogVisible} signOut={signOutDialog} cancelLogout={cancelDialog} title={'Are you sure want to logout?'} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerWrapper: {

    },
    header: {
        width: '100%',
        minHeight: 300,
        justifyContent: 'center',
        alignContent: 'center',
        flexWrap: 'wrap'
    },
    headerContent: {
        width: 200,
        minHeight: 200,
        justifyContent: 'center',
        alignContent: 'center',
        flexWrap: 'wrap'
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
        width: 150,
        height: 150,
        borderRadius: 150,
        justifyContent: 'center',
        alignContent: 'center'
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
    icon: {
        textAlign: 'center',
        lineHeight: 150
    },
    followerWrapper: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
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
    }

});

export default React.memo(HomeScreen);
