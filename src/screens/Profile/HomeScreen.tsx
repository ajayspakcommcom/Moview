import * as React from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import Colors from '../../styles/Colors';
import { useRoute, useNavigation, ParamListBase, NavigationProp, RouteProp } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Fonts from '../../styles/Fonts';


type Props = {

};

const HomeScreen: React.FC<Props> = ({ }) => {

    const navigation: NavigationProp<ParamListBase> = useNavigation();
    const route: RouteProp<{ params: { id: string } }> = useRoute();
    const { user, logout } = useAuth();

    const onSaveHandler = () => {
        navigation.navigate('Home', { screen: 'Notification' });
    };

    const onLogoutHandler = () => {
        logout();
    };


    return (
        <ScrollView style={styles.container}>

            <View style={styles.headerWrapper}>
                <View style={styles.header}>
                    <View style={styles.headerContent}>
                        <View style={styles.userTextIcon}>
                            <View style={styles.userIcon}>
                                <Icon name={'user-alt'} size={80} color={Colors.tabBgColor} onPress={() => console.log('Ram...')} style={styles.icon} />
                            </View>
                            <View style={styles.userTextWrapper}>
                                <Text style={styles.name}>Shiv Kar</Text>
                                <Text style={styles.critic}>Film Critic</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.followerWrapper}>
                    <View style={styles.movies}>
                        <Text style={styles.follText}>200</Text>
                        <Text style={styles.follText}>Movies</Text>
                    </View>
                    <View style={styles.followers}>
                        <Text style={styles.follText}>179</Text>
                        <Text style={styles.follText}>Followers</Text>
                    </View>
                    <View style={styles.following}>
                        <Text style={styles.follText}>179</Text>
                        <Text style={styles.follText}>Following</Text>
                    </View>
                </View>
            </View>

            <View style={styles.myMoviesWrapper}>
                <Text style={styles.movieHeaderText}>My Movies</Text>
                <View style={styles.hr}></View>
            </View>


        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'flex-start',
        // alignItems: 'center',
        // backgroundColor: Colors.darkBackgroudColor,
    },
    headerWrapper: {

    },
    header: {
        width: '100%',
        minHeight: 300,
        justifyContent: 'center',
        alignContent: 'center',
        flexWrap: 'wrap'
    },
    headerContent: {
        width: 200,
        minHeight: 200,
        justifyContent: 'center',
        alignContent: 'center',
        flexWrap: 'wrap'
    },
    userTextIcon: {
        width: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        flexWrap: 'wrap',
        flexDirection: 'row'
    },
    userIcon: {
        backgroundColor: Colors.whiteColor,
        width: 150,
        height: 150,
        borderRadius: 150,
        justifyContent: 'center',
        alignContent: 'center'
    },
    userTextWrapper: {
        width: '100%',
        height: 50,
    },
    name: {
        marginTop: 10,
        color: Colors.whiteColor,
        textAlign: 'center',
        fontFamily: Fonts.Family.Bold,
        fontSize: Fonts.Size.Medium + 10,
        lineHeight: 30
    },
    critic: {
        color: Colors.whiteColor,
        textAlign: 'center',
        fontFamily: Fonts.Family.Medium,
        fontSize: Fonts.Size.Medium + 2,
        lineHeight: 25
    },
    icon: {
        textAlign: 'center',
        lineHeight: 150
    },

    followerWrapper: {
        width: '100%',
        //height: 100,
        //backgroundColor: 'pink',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    movies: {
        marginRight: 15,
        borderRightColor: Colors.whiteColor,
        padding: 15
    },
    followers: {
        marginRight: 15,
        borderRightColor: Colors.whiteColor,
        padding: 15
    },
    following: {
        padding: 15
    },
    follText: {
        textAlign: 'center',
        fontFamily: Fonts.Family.Medium,
        fontSize: Fonts.Size.Medium,
        color: Colors.whiteColor
    },
    myMoviesWrapper: {
        width: '100%',
        minHeight: 200,
        paddingHorizontal: 30
    },
    movieHeaderText: {
        paddingTop: 20,
        fontFamily: Fonts.Family.Bold,
        fontSize: Fonts.Size.Medium + 2,
        color: Colors.whiteColor
    },
    hr: {
        marginTop: 10,
        marginBottom: 10,
        width: '100%',
        minHeight: 2,
        backgroundColor: Colors.tabBgColor,
        borderRadius: 50
    }

});

export default HomeScreen;
