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
import { GestureHandlerRootView, PanGestureHandler, TapGestureHandler } from 'react-native-gesture-handler';
import { GestureHandlerStateChangeNativeEvent, PanGestureHandlerGestureEvent, TapGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

interface ItemProps {
    item: Review;
}

const MyReviewItem: React.FC<ItemProps> = ({ item }) => {

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
                                <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.gradient}>
                                    <Icon name={'user-circle'} size={30} color={Colors.whiteColor} onPress={gotoUserProfile.bind(null, item.user._id)} />
                                </LinearGradient>
                            </View>
                            <View style={styles.content}>
                                <Text style={styles.name} onPress={gotoUserProfile.bind(null, item.user._id)}>{item.user.firstname}</Text>
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
