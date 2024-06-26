import * as React from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import HomeCarousel from '../../components/HomeCarousel/HomeCarousel';
import MovieList from '../../components/MovieList/MovieList';

type RootStackParamList = {
    HomeScreen: undefined;
    DetailScreen: { itemId: string };
};

type HomeScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'HomeScreen'>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: '100%'
        },
        movieList: {
            flex: 1,
            width: '100%',
            backgroundColor: 'grey',
        }
    });

    return (
        <View style={styles.container}>
            <HomeCarousel />
            <View style={styles.movieList}>
                <MovieList />
            </View>
        </View>
    );
};


export default HomeScreen;
