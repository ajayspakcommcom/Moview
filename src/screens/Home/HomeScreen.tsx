import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import HomeCarousel from '../../components/HomeCarousel/HomeCarousel';
import MovieList from '../../components/MovieList/MovieList';
import { setTransparentHeader } from '../../utils/navigationOptions';

type Props = {
    navigation: StackNavigationProp<any>;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {

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


    React.useLayoutEffect(() => {

        setTransparentHeader(navigation, '', 'notifications');

        return () => {

        };
    }, []);

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
