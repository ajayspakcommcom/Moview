import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { Cast } from '../../models/Common';
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';
import { getFirstAndSecondChar, truncateText } from '../../utils/Common';
import LinearGradient from 'react-native-linear-gradient';

interface ItemProps {
    item: Cast;
}

const windowWidth = Dimensions.get('window').width;

const CastItem: React.FC<ItemProps> = ({ item }) => {


    return (
        <View style={styles.wrapper}>
            <View style={styles.headerWrapper}>
                <View style={styles.user}>
                    <Icon name={'user-circle'} size={30} color={Colors.whiteColor} />
                </View>
                <Text style={styles.name}>{getFirstAndSecondChar(item.actor)}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        padding: 5,
        width: (windowWidth / 3),
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerWrapper: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    user: {

    },
    name: {
        color: Colors.whiteColor,
        fontFamily: Fonts.Family.Light,
        fontSize: Fonts.Size.Small + 2,
        textAlign: 'center',
        marginTop: 5
    }
});

export default React.memo(CastItem);