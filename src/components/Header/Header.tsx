import React from 'react';
import { View, Text, StyleSheet, GestureResponderEvent, Pressable } from 'react-native';
import Colors from '../../styles/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import Fonts from '../../styles/Fonts';
import FastImage from 'react-native-fast-image';
import { hitSlops } from '../../utils/Common';

interface HeaderProps {
    message?: string;
    onPressedHandler?: (selectedTab: string) => void;
    navigation: any
}

const Header: React.FC<HeaderProps> = ({ message, onPressedHandler, navigation }) => {

    const [selectedItem, setSelectedItem] = React.useState<string | null>('Latest');

    const handlePress = (item: string) => {
        setSelectedItem(item);
        if (onPressedHandler) {
            onPressedHandler(item);
        }
    };

    const notificationHandler = () => {
        navigation.navigate("Notification");
    };

    React.useLayoutEffect(() => {

        return () => {

        }

    }, []);


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
                    <Pressable onPress={handlePress.bind(null, 'Latest')} hitSlop={hitSlops()}>
                        <Text style={[styles.contentText, selectedItem === 'Latest' ? styles.selected : styles.notSelected]}>Latest</Text>
                    </Pressable>
                    <Pressable onPress={handlePress.bind(null, 'Movies')} hitSlop={hitSlops()}>
                        <Text style={[styles.contentText, selectedItem === 'Movies' ? styles.selected : styles.notSelected]}>Movies</Text>
                    </Pressable>
                    <Pressable onPress={handlePress.bind(null, 'Shows')} hitSlop={hitSlops()}>
                        <Text style={[styles.contentText, selectedItem === 'Shows' ? styles.selected : styles.notSelected]}>Shows</Text>
                    </Pressable>
                </View>
                <View style={[styles.childWrapper, styles.notificationWrapper]}>
                    <Pressable hitSlop={hitSlops()} onPress={notificationHandler}>
                        <Icon name={'notifications'} size={25} color={Colors.tabActiveColor} />
                    </Pressable>
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
        color: Colors.whiteColor,
        paddingHorizontal: 10
    },
    pressable: {
    },
    selected: {
        color: Colors.whiteColor
    },
    notSelected: {
        color: Colors.tabBgColor
    }
});

export default React.memo(Header);
