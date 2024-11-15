import * as React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { setTransparentHeader } from '../../utils/navigationOptions';
import Colors from '../../styles/Colors';
import { useFocusEffect } from '@react-navigation/native';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import { createPadding } from '../../styles/Common';
import { Text } from 'react-native-paper';
import Fonts from '../../styles/Fonts';

const LatestMovieShowList = React.lazy(() => import('../../components/LatestMovieShowList/LatestMovieShowList'));
const MovieList = React.lazy(() => import('../../components/MovieList/MovieList'));
const ShowList = React.lazy(() => import('../../components/ShowList/ShowList'));

const Loading = React.lazy(() => import('../../components/Loading/Loading'));
const Header = React.lazy(() => import('../../components/Header/Header'));
const LanguageDrawer = React.lazy(() => import('../../components/LanguageDrawer/LanguageDrawer'));

type Props = {
    navigation: StackNavigationProp<any>;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {

    const [selectedTab, setSelectedTab] = React.useState<string | null>('Latest');
    const { data: notificationData } = useSelector((state: RootState) => state.notification);
    const [notificationCount, setNotificationCount] = React.useState<number>(0);
    const [isVisibleDrawer, setIsVisibleDrawer] = React.useState<boolean>(false);

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

    const showDrawerHandler = () => {
        setIsVisibleDrawer(true);               
    };

    const closeDrawerHandler = () => {
        setIsVisibleDrawer(false);          
    };

    const applyHandler = (data:any) => {        
        const lowerCaseKeys = Object.keys(data).map(item => item.trim().toLowerCase());          
        console.log(lowerCaseKeys);
        closeDrawerHandler();
    };

    return (        
          <View style={styles.container}>                
                <Header onPressedHandler={onHeaderPressedHandler} navigation={navigation} notificationCount={notificationCount} /> 
                <LanguageDrawer visible={isVisibleDrawer} onCancelHandler={closeDrawerHandler} onApplyHandler={applyHandler} />       
                <View style={styles.filterWrapper}>                                        
                    <Icon name={'filter'} size={25} color={Colors.tabActiveColor} onPress={showDrawerHandler} />                                 
                </View>         
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
        width: '100%', 
        position:'relative'
    },
    movieList: {
        flex: 1,
        backgroundColor: Colors.blackColor,
        justifyContent: 'center'
    },
    text: {
        color: 'white',
        fontSize: 50
    },
    filterWrapper: {        
        position:'absolute',        
        display:'flex',              
        flexDirection: 'row',
        alignItems: 'center',   
        justifyContent: 'space-between',         
        zIndex:1,
        bottom:15,
        right:15, 
        width:40,
        height:40,
    }    
});

export default HomeScreen;
