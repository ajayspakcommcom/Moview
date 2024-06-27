import * as React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import Colors from '../../styles/Colors';
import { useRoute, useNavigation, ParamListBase, NavigationProp, RouteProp } from '@react-navigation/native';
import { useAppContext } from '../../context/AppContext';

type Props = {
}

const HomeScreen: React.FC<Props> = () => {

    const { screenDetail, screenDetailHandler } = useAppContext();

    const navigation: NavigationProp<ParamListBase> = useNavigation();
    const route: RouteProp<{ params: { email: string, userId: string, userName: string } }> = useRoute();

    const goToDetailScreen = () => {

        const user = {
            userId: '123',
            userName: 'John Doe',
            email: 'johndoe@example.com',
        };

        navigation.navigate('Setting', { screen: 'DetailScreen' });
    };

    const correntTabScreenDetailHandler = () => {
        screenDetailHandler('Manis Screen', 'Manish Tab');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Setting Screen {JSON.stringify(screenDetail)}</Text>
            <Button title="Go to Detail Screen" onPress={goToDetailScreen} />
            <Button title="Go to Detail Screen" onPress={() => correntTabScreenDetailHandler()} />
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
