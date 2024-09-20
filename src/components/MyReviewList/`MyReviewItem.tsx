import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { AirbnbRating } from 'react-native-ratings';
import { Review } from '../../models/Review';
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';
import { truncateText } from '../../utils/Common';
import LinearGradient from 'react-native-linear-gradient';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import { PanGestureHandlerGestureEvent, TapGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import MovieImageMap from '../../utils/MovieImageMap';
import FastImage from 'react-native-fast-image';
import LatestMovieShowImageMap from '../../utils/LatestMovieShowImageMap';

interface ItemProps {
    item: Review;
    isUser?: boolean;
}

const MyReviewItem: React.FC<ItemProps> = ({ item, isUser = true }) => {

    const [isExpanded, setIsExpanded] = React.useState(false);
    const navigation = useNavigation<any>();

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    React.useLayoutEffect(() => {

        return () => {

        }
    }, []);

    const onSwipe = (event: PanGestureHandlerGestureEvent) => {

    };

    const onTap = (event: TapGestureHandlerGestureEvent) => {

    };

    const gotoUserProfile = (id: string) => {
        navigation.navigate('FollowerFollowing', { userId: id });
    };


    return (
        <GestureHandlerRootView>
            <PanGestureHandler onGestureEvent={onSwipe}>
                <TouchableOpacity onPress={toggleExpand}>
                    <View style={styles.wrapper}>
                        <View style={styles.headerWrapper}>
                            <View style={styles.user}>

                                {isUser &&
                                    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.gradient}>
                                        <Icon name={'user-circle'} size={30} color={Colors.whiteColor} />
                                    </LinearGradient>
                                }

                                {!isUser &&
                                    <FastImage
                                        style={styles.img}
                                        source={LatestMovieShowImageMap[item.isMovie ? item.movie?.poster_url! : item.show?.poster_url!]}
                                        resizeMode={FastImage.resizeMode.contain}
                                    />
                                }

                            </View>
                            <View style={styles.content}>
                                {item.isMovie && <Text style={styles.name}>{item.movie?.title}</Text>}
                                {item.isShow && <Text style={styles.name}>{item.show?.title}</Text>}
                                <View style={styles.rating}>
                                    <AirbnbRating
                                        count={5}
                                        reviews={["Bad", "Meh", "OK", "Good", "Jesus"]}
                                        defaultRating={item.rating}
                                        size={15}
                                        showRating={false}
                                        isDisabled={true}
                                    />
                                </View>
                            </View>
                            <View style={styles.toggleIcon}>
                                <AntDesignIcon name={'pluscircleo'} size={30} color={Colors.tabActiveColor} />
                            </View>
                        </View>

                        <View style={styles.footerWrapper}>
                            <Text style={styles.footerText}>{isExpanded ? item.review_text : truncateText(item.review_text, 100)}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </PanGestureHandler>
        </GestureHandlerRootView>

    );
};

const styles = StyleSheet.create({
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
    img: {
        width: 30,
        height: 40,
        shadowColor: Colors.blackColor, // Shadow color
        shadowOffset: { width: 0, height: 2 }, // Offset of the shadow
        shadowOpacity: 0.9, // Shadow opacity
        shadowRadius: 4, // Shadow blur radius
        elevation: 5, // Elevation for Android (creates a shadow)
        backgroundColor: Colors.transparentColor, // Background color is necessary for shadow on iOS
        borderRadius: 5, // Optional: to match the image's border radius
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

export default React.memo(MyReviewItem);
