import React from 'react';
import { View, Text, StyleSheet, GestureResponderEvent, Pressable } from 'react-native';
import Colors from '../../styles/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import Fonts from '../../styles/Fonts';
import FastImage from 'react-native-fast-image';

interface HeaderProps {
    message?: string;
}

const Header: React.FC<HeaderProps> = ({ message }) => {

    const [selectedItem, setSelectedItem] = React.useState<string | null>(null);

    const handlePress = (item: string) => {
        setSelectedItem(item);
    };


    return (
        <>
            <View style={styles.headerWrapper}>
                <View style={[styles.childWrapper, styles.logoWrapper]}>
                    <FastImage
                        style={styles.logoImg}
                        source={require('../../assets/images/small-logo.png')}
                        resizeMode={FastImage.resizeMode.contain}
                    />

                </View>
                <View style={[styles.childWrapper, styles.contentWrapper]}>
                    <Pressable onPress={handlePress.bind(null, 'Latest')}>
                        <Text style={[styles.contentText, selectedItem === 'Latest' && styles.selected]}>Latest</Text>
                    </Pressable>
                    <Pressable onPress={handlePress.bind(null, 'Movies')}>
                        <Text style={[styles.contentText, selectedItem === 'Movies' && styles.selected]}>Movies</Text>
                    </Pressable>
                    <Pressable onPress={handlePress.bind(null, 'Shows')}>
                        <Text style={[styles.contentText, selectedItem === 'Shows' && styles.selected]}>Shows</Text>
                    </Pressable>
                </View>
                <View style={[styles.childWrapper, styles.notificationWrapper]}>
                    <Icon name={'notifications'} size={25} color={Colors.tabActiveColor} />
                </View>
            </View>
        </>
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
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'red'
    },
    logoImg: {
        width: 60,
        height: 35
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
        color: Colors.tabBgColor,
        paddingHorizontal: 10
    },
    pressable: {
    },
    selected: {
        color: Colors.whiteColor
    }
});

export default React.memo(Header);
