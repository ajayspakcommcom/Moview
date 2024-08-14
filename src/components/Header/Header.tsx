import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import Colors from '../../styles/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import Fonts from '../../styles/Fonts';

interface HeaderProps {
    message?: string;
}

const Header: React.FC<HeaderProps> = ({ message }) => {
    return (
        <View style={styles.headerWrapper}>
            <View style={[styles.childWrapper, styles.logoWrapper]}>
                <Text style={styles.logo}>Moviu</Text>
            </View>
            <View style={[styles.childWrapper, styles.contentWrapper]}>
                <Text style={styles.contentText}>Latest</Text>
                <Text style={styles.contentText}>Movies</Text>
                <Text style={styles.contentText}>Shows</Text>
            </View>
            <View style={[styles.childWrapper, styles.notificationWrapper]}>
                <Icon name={'notifications'} size={25} color={Colors.tabActiveColor} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerWrapper: {
        width: '100%',
        height: 50,
        backgroundColor: Colors.blackColor,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    childWrapper: {
        height: 50,
    },
    logoWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 15,
    },
    contentWrapper: {
        flex: 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    notificationWrapper: {
        paddingRight: 15,
        alignItems: 'flex-end',
        justifyContent: 'center',
        flex: 1,
    },
    logo: {
        color: Colors.whiteColor,
        fontFamily: Fonts.Family.Bold,
        fontSize: Fonts.Size.Medium + 5
    },
    contentText: {
        color: Colors.whiteColor,
        paddingHorizontal: 10
    }
});

export default React.memo(Header);
