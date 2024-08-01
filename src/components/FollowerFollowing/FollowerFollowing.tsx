import * as React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, PressableProps } from 'react-native';
import Colors from '../../styles/Colors';
import { useRoute, useNavigation, ParamListBase, NavigationProp, RouteProp } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Fonts from '../../styles/Fonts';
import { capitalizeFirstLetter } from '../../utils/Common';
import { UserItem } from '../../types/User';
import CustomButton from '../Ui/CustomButton';


type Props = {
    userData?: UserItem
};

const FollowerFollowing: React.FC<Props> = ({ userData }) => {

    React.useLayoutEffect(() => {

        console.log('userData', userData);

        return () => console.log('');
    }, [userData]);

    const formHandler = async () => {
        console.log('formHandler');
    };

    return (
        <ScrollView style={styles.container}>

            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <View style={styles.userTextIcon}>
                        <View style={styles.userIcon}>
                            <Icon name={'user-alt'} size={40} color={Colors.tabBgColor} onPress={() => console.log('Ram...')} style={styles.icon} />
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
                    <Text style={styles.follText}>{userData?.followers.length}</Text>
                    <Text style={styles.follText}>Followers</Text>
                </View>
                <View style={styles.following}>
                    <Text style={styles.follText}>{userData?.following.length}</Text>
                    <Text style={styles.follText}>Following</Text>
                </View>
                <View style={styles.movies}>
                    <Text style={styles.follText}>200</Text>
                    <Text style={styles.follText}>Movies Reviewed</Text>
                </View>
            </View>

            <CustomButton
                text={'Follow'}
                onPressHandler={formHandler}
                textSize={20}
                isDisabled={false}
            />

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
        flexDirection: 'row',
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
