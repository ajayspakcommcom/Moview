import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { AirbnbRating } from 'react-native-ratings';
import { Review } from '../../models/Review';
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';
import { truncateText } from '../../utils/Common';
import LinearGradient from 'react-native-linear-gradient';
import { GestureHandlerRootView, LongPressGestureHandler, TapGestureHandler } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { ShowReview } from '../../models/ShowReview';
import { useAuth } from '../../context/AuthContext';
import FastImage from 'react-native-fast-image';
import ReportShowModal from '../ReportModal/ReportShowModal';

interface ItemProps {
    // item: ShowReview;
    item: Review;
    showId: string
}

const ShowReviewItem: React.FC<ItemProps> = ({ item, showId }) => {

    const { userDetail } = useAuth();

    const [isExpanded, setIsExpanded] = React.useState(false);
    const navigation = useNavigation<any>();
    const [pressed, setPressed] = React.useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);        
    };

    const gotoUserProfile = (id: string) => {
        navigation.navigate('FollowerFollowing', { userId: id });
    };

    const onLongPress = () => {
        setPressed(true);
    };

    const handleCloseModal = () => {
        setPressed(false);
    };

    return (
        <GestureHandlerRootView>

            <View style={styles.wrapper}>
                <LongPressGestureHandler onActivated={onLongPress} minDurationMs={500}>
                    <View style={styles.headerWrapper}>
                        {Platform.OS === 'android' && <View style={styles.user}>
                            <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.gradient}>
                                <Icon
                                    name={'user-circle'}
                                    size={30}
                                    color={Colors.whiteColor}
                                    onPress={userDetail._id === item.user._id ? undefined : gotoUserProfile.bind(null, item.user._id)}
                                />
                            </LinearGradient>
                        </View>}
                        {
                            Platform.OS === 'ios' && <View style={styles.user}>
                                <FastImage style={styles.icon} source={require('../../assets/images/icons/profile-w.png')} />
                            </View>
                        }
                        <View style={styles.content}>

                            {/* <Text style={styles.name} onPress={gotoUserProfile.bind(null, item.user._id)}>{item.user.firstname}</Text> */}
                            <Text style={styles.name} onPress={userDetail._id === item.user._id ? undefined : gotoUserProfile.bind(null, item.user._id)}>{item.user.firstname}</Text>
                            <View style={styles.rating}>
                                <AirbnbRating
                                    count={5}
                                    reviews={["Bad", "Meh", "OK", "Good", "Jesus"]}
                                    defaultRating={item.rating}
                                    size={15}
                                    showRating={false}
                                    isDisabled={true}
                                    selectedColor={Colors.tabActiveColor}
                                />
                            </View>
                        </View>
                        <View style={styles.toggleIcon}>
                            <AntDesignIcon name={'pluscircleo'} size={30} color={Colors.tabActiveColor} />
                        </View>
                    </View>
                </LongPressGestureHandler>

                <Pressable onPress={toggleExpand}>
                    <View style={styles.footerWrapper}>
                        <Text style={styles.footerText}>{isExpanded ? item.review_text : truncateText(item.review_text, 100)}</Text>
                    </View>
                </Pressable>

                <ReportShowModal 
                userId={userDetail._id}
                showId={showId}
                reviewId={item._id}              
                visible={pressed}
                cancel={handleCloseModal}  
            />                   

            </View>

        </GestureHandlerRootView>

    );
};

const styles = StyleSheet.create({
    icon: {
        width: 25,
        height: 25
    },
    wrapper: {
        backgroundColor: Colors.reviewBgColor,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    headerWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    user: {
        width: 30
    },
    gradient: {
        borderRadius: 30
    },
    content: {
        paddingHorizontal: 10,
    },
    name: {
        fontSize: Fonts.Size.Medium,
        fontWeight: '500',
        color: Colors.whiteColor
    },
    rating: {
        flex: 1,
        alignItems: 'flex-start',
        textAlign: 'left'
    },
    toggleIcon: {
        width: 30,
        display: 'none'
    },
    footerWrapper: {
        marginTop: 2
    },
    footerText: {
        color: Colors.whiteColor,
        lineHeight: 20
    }
});

export default React.memo(ShowReviewItem);
