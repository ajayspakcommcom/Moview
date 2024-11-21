import * as React from 'react';
import { View, StyleSheet, Button, Pressable, Text,  } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { setTransparentHeader } from '../../utils/navigationOptions';
import Colors from '../../styles/Colors';
import { useFocusEffect } from '@react-navigation/native';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import { API_URL } from "../../configure/config.android";
import { useAuth } from '../../context/AuthContext';



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

    const { user } = useAuth();
    const [selectedTab, setSelectedTab] = React.useState<string | null>('Latest');
    const { data: notificationData } = useSelector((state: RootState) => state.notification);
    const [notificationCount, setNotificationCount] = React.useState<number>(0);
    const [isVisibleDrawer, setIsVisibleDrawer] = React.useState<boolean>(false);
    const [filteredData, setFilteredData] = React.useState([]);
    const [selectedCheckbox, setSelectedCheckbox] = React.useState<{[key: string]: any} | null>();
    const abortController = new AbortController();
    const signal = abortController.signal;

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

    const toggleDrawerHandler = () => {
        setIsVisibleDrawer(!isVisibleDrawer);         
    };

    const closeDrawerHandler = () => {
        setIsVisibleDrawer(false);          
    };

    const getLatestMovieShowList = async () => {

        const url = `${API_URL}latest/movie-show`;
        const token = user;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token?.token}`,
                    'Content-Type': 'application/json'
                },
                signal: signal
            });

            const result = await response.json();

            if (result.status === 'success') {
                const sortedData = result.data.sort((a: any, b: any) => {
                    return a.title.localeCompare(b.title);
                });
                setFilteredData(sortedData);                
            }

        } catch (error) {
            console.log('');
        }

    };

    const applyHandler = async (data:any) => {
        
        const lowerCaseKeys = Object.keys(data).filter(key => data[key]).map(item => item.trim().toLowerCase());        
        setSelectedCheckbox(data);
        closeDrawerHandler();

        if(lowerCaseKeys.length > 0) {
            const response = await fetch(`${API_URL}latest/movie-show/filtered`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user?.token}`,
                },
                body: JSON.stringify({
                  filterData:lowerCaseKeys            
                })
            });
               const resp = await response.json();
            if(resp.data.length > 0) {
                setFilteredData(resp.data);
            }            
        } else {            
            getLatestMovieShowList();
        }
    };

   

    return (        
          <View style={styles.container}>                
                <Header onPressedHandler={onHeaderPressedHandler} navigation={navigation} notificationCount={notificationCount} />  

                <View style={styles.movieList}>
                    <React.Suspense fallback={<Loading />}>
                        {selectedTab === 'Latest' && <LatestMovieShowList filteredData={filteredData} />}
                        {selectedTab === 'Movies' && <MovieList />}
                        {selectedTab === 'Shows' && <ShowList />}
                    </React.Suspense>
                </View>            
                                                
                {isVisibleDrawer && <View style={styles.drawerMainWrapper}><LanguageDrawer visible={isVisibleDrawer} onCancelHandler={closeDrawerHandler} onApplyHandler={applyHandler} getSelectedLanguage={selectedCheckbox} /></View>}
                <View style={styles.filterWrapper}>                                        
                    <Pressable style={styles.filteredBtnWrapper} onPress={toggleDrawerHandler}>
                        <Icon name={'filter'} size={25} color={Colors.tabActiveColor} />
                    </Pressable>                                                  
                </View>                
        </View>        
    );
};

const styles = StyleSheet.create({

    drawerMainWrapper: {
        position:'absolute',
        backgroundColor:'rgba(0, 0, 0, 0.4)',         
        top:0, 
        left:0,
        bottom:0, 
        right:0, 
        width:'100%',
        height:'100%',
        justifyContent:'center', 
        alignItems:'center', 
        paddingHorizontal:15               
    },

    filteredBtnWrapper: {
        width:40,
        height:40,
        backgroundColor:Colors.whiteColor,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        shadowColor: Colors.blackColor,
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.25, 
        shadowRadius: 3.5, 
        elevation: 5, 
    },
    filteredPopWrapper: {
        width: 300,
        height: 300,
        backgroundColor: 'red',
        position: 'absolute',
        bottom: '100%',
        right: '100%',                        
        shadowColor: Colors.blackColor,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 4,                        
        elevation: 5
    },
    container: {
        flex: 1,
        width: '100%', 
        position:'relative'
    },
    movieList: {
        flex: 1,
        backgroundColor: Colors.blackColor,
        justifyContent: 'center',
        position:'relative',
        zIndex:0
    },
    text: {
        color: Colors.whiteColor,
        fontSize: 50
    },
    filterWrapper: {               
        position:'absolute',        
        display:'flex',              
        flexDirection: 'row',
        alignItems: 'center',   
        justifyContent: 'space-between',         
        zIndex:9,
        bottom:15,
        right:15, 
        width:40,
        height:40        
    }    
});

export default HomeScreen;
