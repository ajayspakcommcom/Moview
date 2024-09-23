import * as React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { setTransparentHeader } from '../../utils/navigationOptions';
import Colors from '../../styles/Colors';

const LatestMovieShowList = React.lazy(() => import('../../components/LatestMovieShowList/LatestMovieShowList'));
const MovieList = React.lazy(() => import('../../components/MovieList/MovieList'));
const ShowList = React.lazy(() => import('../../components/ShowList/ShowList'));

const Loading = React.lazy(() => import('../../components/Loading/Loading'));
const Header = React.lazy(() => import('../../components/Header/Header'));

type Props = {
    navigation: StackNavigationProp<any>;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {

    const [selectedTab, setSelectedTab] = React.useState<string | null>('Latest');

    React.useLayoutEffect(() => {

        setTransparentHeader(navigation, '', 'notifications');

        return () => {

        };
    }, [navigation]);

    const handlePress = () => {

    };

    const onHeaderPressedHandler = (tab: string) => {
        setSelectedTab(tab)
    };

    return (
        <>
            <View style={styles.container}>
                <Header onPressedHandler={onHeaderPressedHandler} navigation={navigation} />
                <View style={styles.movieList}>
                    <React.Suspense fallback={<Loading />}>
                        {selectedTab === 'Latest' && <LatestMovieShowList />}
                        {selectedTab === 'Movies' && <MovieList />}
                        {selectedTab === 'Shows' && <ShowList />}
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
        flex: 1,
        backgroundColor: Colors.blackColor,
        justifyContent: 'center'
    },
    text: {
        color: 'white',
        fontSize: 50
    }
});

export default HomeScreen;
