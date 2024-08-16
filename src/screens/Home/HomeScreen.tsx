import * as React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { setTransparentHeader } from '../../utils/navigationOptions';
import Colors from '../../styles/Colors';
// import Header from '../../components/Header/Header';

const MovieList = React.lazy(() => import('../../components/MovieList/MovieList'));
const Loading = React.lazy(() => import('../../components/Loading/Loading'));
const Header = React.lazy(() => import('../../components/Header/Header'));

type Props = {
    navigation: StackNavigationProp<any>;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {

    React.useLayoutEffect(() => {

        setTransparentHeader(navigation, '', 'notifications');

        return () => {

        };
    }, []);

    const handlePress = () => {
        console.log('Ram...');
        Alert.alert('Button pressed', 'Ram...');
    };

    return (
        <>
            <View style={styles.container}>
                <Header />
                <View style={styles.movieList}>
                    <React.Suspense fallback={<Loading />}>
                        <MovieList />
                    </React.Suspense>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },
    movieList: {
        backgroundColor: Colors.tabBgColor
    },
    text: {
        color: 'white',
        fontSize: 50
    }
});

export default HomeScreen;
