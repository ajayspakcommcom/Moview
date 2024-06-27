import * as React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import Colors from '../../styles/Colors';
import { useRoute, useNavigation, ParamListBase, NavigationProp, RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
    navigation: StackNavigationProp<any>;
};

const Notification: React.FC<Props> = ({ }) => {

    const navigation: NavigationProp<ParamListBase> = useNavigation();
    const route: RouteProp<{ params: { id: string, queryParams: any } }> = useRoute();

    React.useLayoutEffect(() => {

        const backButtonHandler = () => {
            navigation.navigate('Profile', { screen: 'HomeScreen' });
        };

        const gotoNotification = () => {
            console.log('Notification...');
        };

        navigation.setOptions({
            title: `Test`,
            headerLeft: () => {
                return <Icon name={'chevron-back'} size={30} color={Colors.whiteColor} onPress={backButtonHandler} />
            },
            headerRight: () => {
                return <Icon name={'notifications'} size={25} color={Colors.tabActiveColor} onPress={gotoNotification} />
            }
        });

        return console.log('');
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Notification Screen {route.name}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.whiteColor,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default Notification;
