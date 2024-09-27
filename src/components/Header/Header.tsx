import React from 'react';
import { View, Text, StyleSheet, Pressable, LayoutChangeEvent } from 'react-native';
import Colors from '../../styles/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import Fonts from '../../styles/Fonts';
import FastImage from 'react-native-fast-image';
import { hitSlops } from '../../utils/Common';
import { useAuth } from '../../context/AuthContext';
import { API_URL } from '../../configure/config.android';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store/index';
import { fetchNotificationsByUserId } from '../../store/slices/notificationSlice';


interface HeaderProps {
    message?: string;
    onPressedHandler?: (selectedTab: string) => void;
    navigation: any
}

const Header: React.FC<HeaderProps> = ({ message, onPressedHandler, navigation }) => {

    const { userDetail, user } = useAuth();
    const { data: notificationData } = useSelector((state: RootState) => state.notification);
    const [selectedItem, setSelectedItem] = React.useState<string | null>('Latest');
    const [notificationCount, setNotificationCount] = React.useState<number>(0);
    const dispatch = useAppDispatch();
    
    const handlePress = (item: string) => {
        setSelectedItem(item);
        if (onPressedHandler) {
            onPressedHandler(item);
        }
    };

    const notificationHandler = () => {
        navigation.navigate("Notification");
    };

    const getNotificationCount = () => {
        const notificationUrl = `${API_URL}notification/follower/${userDetail?._id}`;
        dispatch(fetchNotificationsByUserId({ url: notificationUrl, token: user?.token! }));
        const count = notificationData.filter((item: any) => item.user_id === userDetail?._id).length;
        setNotificationCount(count);
    };



    React.useLayoutEffect(() => {
       getNotificationCount();
        return () => {
        };
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
                    <Pressable hitSlop={hitSlops()} onPress={notificationHandler} style={styles.notificationBtn}>
                        <Icon name={'notifications'} size={25} color={Colors.tabActiveColor} />
                        {notificationCount > 0 && <Text style={styles.notificationText}>{notificationCount}</Text>}                        
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
        justifyContent: 'center'
    },
    logoImg: {
        width: 80,
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
        position: 'relative'
    },
    notificationBtn: {        
        position: 'relative'
    },
    notificationText: {
        position: 'absolute',
        bottom: 15,
        left: 12,        
        width: 20,
        height: 20,
        borderRadius: 50,
        textAlign: 'center',
        color: Colors.whiteColor,
        fontFamily: Fonts.Family.Bold,
        fontSize: Fonts.Size.X_Small
    },
    logo: {
        color: Colors.whiteColor,
        fontFamily: Fonts.Family.Bold,
        fontSize: Fonts.Size.Medium + 5
    },
    contentText: {
        fontSize: Fonts.Size.Medium,
        color: Colors.whiteColor,
        paddingHorizontal: 10,
        fontWeight: '500'
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
