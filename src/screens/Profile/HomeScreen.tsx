import * as React from 'react';
import { View, StyleSheet, ScrollView, Pressable, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Colors from '../../styles/Colors';
import { useAuth } from '../../context/AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Fonts from '../../styles/Fonts';
import { capitalizeFirstLetter } from '../../utils/Common';
import { API_URL } from '../../configure/config.android';
import { Text } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import FastImage from 'react-native-fast-image';

const AlertDialog = React.lazy(() => import('../../components/AlertDialog/AlertDialog'));
const CustomButton = React.lazy(() => import('../../components/Ui/CustomButton'));
const UserProfileForm = React.lazy(() => import('../../components/UserProfileForm/UserProfileForm'));

import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store/index';
import { useFocusEffect } from '@react-navigation/native';
import { fetchFollowings } from '../../store/slices/followingSlice';
import { fetchFollowers } from '../../store/slices/followerSlice';

type Props = {
    navigation: any;
    route: any;
};

const HomeScreen: React.FC<Props> = ({ navigation, route }) => {


    const { user, logout, userDetail } = useAuth();
    const [myReviews, setMyReviews] = React.useState(0);

    const [dialogVisible, setDialogVisible] = React.useState<boolean>(false);
    const cancelDialog = () => setDialogVisible(false);
    const [isEditMode, setIsEditMode] = React.useState<boolean>(false);

    const { data: moviewReviews } = useSelector((state: RootState) => state.myMovieReview);
    const { data: showReviews } = useSelector((state: RootState) => state.myShowReview);
    const { count: followerCount } = useSelector((state: RootState) => state.myFollower);
    const { count: followingCount } = useSelector((state: RootState) => state.myFollowing);
    const dispatch = useAppDispatch();

    const signOutDialog = () => {
        logout();
        setDialogVisible(false)
    };

    const gotoScreen = (screen: string) => {
        navigation.navigate(screen);
    };

    const gotoTabScreen = (tab: string, screen: string) => {
        navigation.navigate(tab, { screen: screen });
    };

    const onLogoutHandler = () => {
        setDialogVisible(true);        
    };

    const getFollowingCount = async () => {
        const url = `${API_URL}following/${userDetail._id}`; // logged user id        
        dispatch(fetchFollowings({ url, token: user?.token! }));
    };

    const getFollowerCount = async () => {
        const url = `${API_URL}follower/${userDetail._id}`;
        dispatch(fetchFollowers({ url: url, token: user?.token! }));
    };

    const getReviewListByUser = async () => {
        setMyReviews((moviewReviews.length + showReviews.length));
    };


    useFocusEffect(
        React.useCallback(() => {

            getFollowerCount();
            getFollowingCount();
            getReviewListByUser();

            return () => {
            };
        }, [moviewReviews, showReviews])
    );

    const editHandler = () => {
        setIsEditMode(true);
    };

    const onEditCancelHandler = (bool: boolean) => {
        setIsEditMode(bool);
    };

    const navigationHandler = () => {
        logout();
    };

    return (

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView behavior={'padding'} style={styles.keypad}>
                <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{flex:1}}>
                    {userDetail.role !== 'guest' &&
                        <View style={styles.container}>
                            <View style={[styles.innerContainer]}>
                                {
                                    !isEditMode &&
                                    <>                                        
                                        <View style={[styles.header]}>
                                            <View style={styles.headerContent}>
                                                <View style={styles.userTextIcon}>
                                                    <View style={styles.userIcon}>                                                        
                                                        <FastImage style={{ width: 25, height: 25 }} source={require('../../assets/images/icons/profile-y.png')} />
                                                    </View>
                                                    <View style={styles.userTextWrapper}>
                                                        <Text style={styles.name}>{capitalizeFirstLetter(userDetail.firstname)}</Text>
                                                        {userDetail.biography && <Text style={styles.critic}>{userDetail.biography}</Text>}
                                                    </View>
                                                </View>
                                            </View>
                                        </View>

                                        <View style={[styles.followerWrapper]}>
                                            <Pressable onPress={gotoTabScreen.bind(null, 'MyReview', 'HomeScreen')}>
                                                <View style={styles.movies}>
                                                    <Text style={styles.follText}>{myReviews}</Text>
                                                    <Text style={styles.follText}>Reviews</Text>
                                                </View>
                                            </Pressable>

                                            <Pressable onPress={gotoScreen.bind(null, 'FollowerScreen')}>
                                                <View style={styles.followers}>
                                                    <Text style={styles.follText}>{followerCount}</Text>
                                                    <Text style={styles.follText}>Followers</Text>
                                                </View>
                                            </Pressable>

                                            <Pressable onPress={gotoScreen.bind(null, 'FollowingScreen')}>
                                                <View style={styles.following}>
                                                    <Text style={styles.follText}>{followingCount}</Text>
                                                    <Text style={styles.follText}>Followings</Text>
                                                </View>
                                            </Pressable>

                                        </View>

                                        <View style={[styles.myMoviesWrapper]}>
                                            <View style={styles.hr}></View>
                                            <View style={styles.footerBtnsWrapper}>
                                            <Pressable onPress={editHandler} style={styles.footerBtns}>
                                                <Text style={styles.footerBtnText}>Edit Profile</Text>
                                            </Pressable>
                                            </View>
                                            <View style={styles.footerWrapper}>
                                                <CustomButton text={'Logout...'} onPressHandler={onLogoutHandler} textSize={20} />
                                            </View>
                                        </View>
                                    </>
                                }
                                {isEditMode && <UserProfileForm onCancel={onEditCancelHandler} />}
                                <AlertDialog visible={dialogVisible} signOut={signOutDialog} cancelLogout={cancelDialog} title={'Are you sure want to logout?'} />
                            </View>                            
                        </View>
                    }

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
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    keypad: {
        flex: 1
    },
    withoutLoginWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15
    },
    logoWrapper: {        
        alignItems: 'center'
    },
    logoImg: {
        width: 122,
        height: 50
    },
    honest: {
        fontFamily: Fonts.Family.Medium,
        fontSize: Fonts.Size.Small - 2,
        color: Colors.whiteColor,
    },
    container: {
        flex: 1
    },
    innerContainer: {
        flex: 1,
        flexDirection:'column', 
        justifyContent:'center'
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
        paddingTop:30
    },
    headerContent: {
        width: '80%', //200,
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
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        textAlign: 'center'
    },
    userTextWrapper: {
        width: '100%',
        minHeight: 50,
        //backgroundColor:'red'
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
        fontSize: Fonts.Size.Small,
        lineHeight: 22,
        marginTop: 5
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
    footerBtnsWrapper:{
        paddingTop:15
    },
    footerBtns: {
        borderColor:Colors.whiteColor,
        borderWidth:2,
        alignItems:'center',
        padding:15
    },
    footerBtnText: {
        color:Colors.whiteColor
    },
    footerWrapper: {
        paddingTop: 15
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
