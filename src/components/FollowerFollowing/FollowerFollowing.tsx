import * as React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import Colors from '../../styles/Colors';
import { useAuth } from '../../context/AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Fonts from '../../styles/Fonts';
import { capitalizeFirstLetter } from '../../utils/Common';
import { UserItem } from '../../types/User';
import CustomButton from '../Ui/CustomButton';
import { API_URL } from '../../configure/config.android';

import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store/index';
import { userFetchFollowers } from '../../store/slices/userFollowerSlice';
import { userFetchFollowings } from '../../store/slices/userFollowingSlice';
import { createFollower,  removeFollower } from '../../store/slices/followerSlice';


type Props = {
    userData?: UserItem
};

const FollowerFollowing: React.FC<Props> = ({ userData }) => {

    const { userDetail, user, appCounter } = useAuth();
    const [isFollowing, setIsFollowing] = React.useState(false);
    const [followData, setFollowData] = React.useState({ followers: 0, following: 0 });
    const [moviesReviewed, setMoviesReviewed] = React.useState(0);

    const abortController = new AbortController();
    const signal = abortController.signal;

    const { count: followerCount } = useSelector((state: RootState) => state.userFollower);           
    const { count: followingCount } = useSelector((state: RootState) => state.userFollowing);    
    const { data: myFollowing } = useSelector((state: RootState) => state.myFollowing);
    const { data: myFollower } = useSelector((state: RootState) => state.myFollower);


    const dispatch = useAppDispatch();

    const getFollowerCount = async () => {
        dispatch(userFetchFollowers({ url: `${API_URL}follower/${userData?._id}`, token: user?.token! }));                
    };

    const getFollowingCount = async () => {
        dispatch(userFetchFollowings({ url: `${API_URL}following/${userData?._id}`, token: user?.token! }));             
    };

    const checkIfFollowing = async () => {
        const isFollowing = myFollower.find(item => item.followerId._id === userData?._id)?.isFollowing        
        setIsFollowing(isFollowing!);
    };

    const getReviewListByUser = async () => {

        const url = `${API_URL}review/user/${userData?._id}`;
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
        
        checkIfFollowing();
        getFollowerCount();
        getFollowingCount();
        getReviewListByUser();
        
        return () => {
            abortController.abort();
        };
    }, [userData]);

 
    const followHandler = async () => {
        console.log('followHandler');
        const response = await dispatch(createFollower({ url: `${API_URL}follow`, token: user?.token!, userId: userData?._id!, followerId: userDetail._id }));          
        console.log('response', response);
    };

    const UnFollowHandler = async () => {
        console.log('UnFollowHandler');
        const followerId = userDetail._id; //logged in user id
        await dispatch(removeFollower({ url: `${API_URL}unfollow`, token: user?.token!, userId: userData?._id!, followerId:followerId }));  
    };

    return (
        <ScrollView style={styles.container}>

            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <View style={styles.userTextIcon}>
                        <View style={styles.userIcon}>
                            <Icon name={'user-alt'} size={40} color={Colors.tabBgColor} style={styles.icon} />
                        </View>
                        <View>
                            <Text style={styles.name}>{capitalizeFirstLetter(userData?.firstname as string)}</Text>
                            <Text style={styles.critic}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.followerWrapper}>
                <View style={styles.followers}>                    
                    <Text style={styles.follText}>{followerCount}</Text>
                    <Text style={styles.follText}>Followers</Text>
                </View>
                <View style={styles.following}>
                    <Text style={styles.follText}>{followingCount}</Text>
                    <Text style={styles.follText}>Followings</Text>
                </View>
                <View style={styles.movies}>
                    <Text style={styles.follText}>{moviesReviewed}</Text>
                    <Text style={styles.follText}>Reviewed</Text>
                </View>
            </View>


            {/* {!isFollowing &&
                <CustomButton
                    text={'Follow'}
                    onPressHandler={followHandler}
                    textSize={20}
                    isDisabled={false}
                />
            }

            {isFollowing &&
                <CustomButton
                    text={'Unfollow'}
                    onPressHandler={UnFollowHandler}
                    textSize={20}
                    isDisabled={false}
                />
            } */}

            {isFollowing &&
                <CustomButton
                    text={'Unfollow'}
                    onPressHandler={UnFollowHandler}
                    textSize={20}
                    isDisabled={false}
                />
            }
            
            {!isFollowing &&
                <CustomButton
                    text={'Follow'}
                    onPressHandler={followHandler}
                    textSize={20}
                    isDisabled={false}
                />
            }

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15
    },
    header: {
        width: '100%',
        justifyContent: 'flex-start',
        alignContent: 'flex-start'
    },
    headerContent: {
        width: '100%'
    },
    userTextIcon: {
        flexDirection: 'row'
    },
    userIcon: {
        backgroundColor: Colors.whiteColor,
        width: 80,
        height: 80,
        borderRadius: 80,
        justifyContent: 'center',
        alignContent: 'center',
        marginRight: 15
    },
    name: {
        marginTop: 10,
        color: Colors.whiteColor,
        textAlign: 'left',
        fontFamily: Fonts.Family.Bold,
        fontSize: Fonts.Size.Medium + 2,
        lineHeight: 30
    },
    critic: {
        color: Colors.whiteColor,
        fontFamily: Fonts.Family.Medium,
        fontSize: Fonts.Size.Medium - 2,
        lineHeight: 18
    },
    icon: {
        textAlign: 'center',
        lineHeight: 80
    },
    followerWrapper: {
        width: '100%',
        flexDirection: 'row',
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    movies: {
        borderRightColor: Colors.whiteColor,
        paddingVertical: 15,

    },
    followers: {
        borderRightColor: Colors.whiteColor,
        paddingVertical: 15
    },
    following: {
        paddingVertical: 15,
        paddingHorizontal: 15
    },
    follText: {
        textAlign: 'center',
        fontFamily: Fonts.Family.Medium,
        fontSize: Fonts.Size.Medium,
        color: Colors.whiteColor
    }
});

export default React.memo(FollowerFollowing);
