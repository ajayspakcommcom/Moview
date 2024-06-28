import * as React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import Colors from '../../styles/Colors';
import { useRoute, useNavigation, ParamListBase, NavigationProp, RouteProp } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';


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
        <View style={styles.container}>
            <Text style={styles.text}>Search Screen</Text>
            {/* <Button title="Go to Detail Screen" onPress={onSaveHandler} /> */}
            <Button title="Go to Detail Screen" onPress={onLogoutHandler} />
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

export default HomeScreen;
