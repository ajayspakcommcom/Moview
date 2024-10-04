import * as React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { setTransparentHeader } from '../../utils/navigationOptions';
import Colors from '../../styles/Colors';
import { Text } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';

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
    const { data: notificationData } = useSelector((state: RootState) => state.notification);
    const [notificationCount, setNotificationCount] = React.useState<number>(0);

    React.useLayoutEffect(() => {
        setTransparentHeader(navigation, '', 'notifications');
        return () => {};
    }, [navigation]);

    useFocusEffect(
        React.useCallback(() => {            
            setNotificationCount(notificationData.length);
        }, [notificationData])
    );

    const onHeaderPressedHandler = (tab: string) => {
        setSelectedTab(tab)
    };

    return (
        <View style={styles.container}>                
                <Header onPressedHandler={onHeaderPressedHandler} navigation={navigation} notificationCount={notificationCount} /> 
                <View style={styles.movieList}>
                    <React.Suspense fallback={<Loading />}>
                        {selectedTab === 'Latest' && <LatestMovieShowList />}
                        {selectedTab === 'Movies' && <MovieList />}
                        {selectedTab === 'Shows' && <ShowList />}
                    </React.Suspense>
                </View>            
        </View>
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
