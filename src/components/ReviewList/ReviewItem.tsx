import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { Review } from '../../models/Common';
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';
import { truncateText } from '../../utils/Common';
import LinearGradient from 'react-native-linear-gradient';

interface ItemProps {
    item: Review;
}

const ReviewItem: React.FC<ItemProps> = ({ item }) => {

    const [isExpanded, setIsExpanded] = React.useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <TouchableOpacity onPress={toggleExpand}>
            <View style={styles.wrapper}>
                <View style={styles.headerWrapper}>
                    <View style={styles.user}>
                        <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.gradient}>
                            <Icon name={'user-circle'} size={30} color={Colors.whiteColor} />
                        </LinearGradient>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.name}>{item.name}</Text>
                        <View style={styles.rating}>
                            <AirbnbRating
                                count={5}
                                reviews={["Bad", "Meh", "OK", "Good", "Jesus"]}
                                defaultRating={3}
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
                    <Text style={styles.footerText}>{isExpanded ? item.description : truncateText(item.description, 100)}</Text>
                </View>
            </View>
        </TouchableOpacity>
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
        flex: 1,
        paddingHorizontal: 10
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

export default ReviewItem;
