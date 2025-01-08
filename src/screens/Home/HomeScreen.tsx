import * as React from 'react';
import { View, StyleSheet,  Pressable, Text,  Dimensions, TouchableOpacity, } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { setTransparentHeader } from '../../utils/navigationOptions';
import Colors from '../../styles/Colors';
import { useFocusEffect } from '@react-navigation/native';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import { API_URL } from "../../configure/config.ios";
import { useAuth } from '../../context/AuthContext';
import FastImage from 'react-native-fast-image';
import { TabView, SceneRendererProps, NavigationState } from 'react-native-tab-view';
import { hitSlops } from '../../utils/Common';
import Fonts from '../../styles/Fonts';

type Route = {
  key: string;
  render?: () => React.ReactNode;
};

type State = NavigationState<Route>;



const LatestMovieShowList = React.lazy(() => import('../../components/LatestMovieShowList/LatestMovieShowList'));
const MovieList = React.lazy(() => import('../../components/MovieList/MovieList'));
const ShowList = React.lazy(() => import('../../components/ShowList/ShowList'));

const Loading = React.lazy(() => import('../../components/Loading/Loading'));
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
  const [selectedCheckbox, setSelectedCheckbox] = React.useState<{ [key: string]: any } | null>();
  const abortController = new AbortController();
  const signal = abortController.signal;
  const { width } = Dimensions.get('screen');
  const [index, setIndex] = React.useState(0);

  React.useLayoutEffect(() => {
    setTransparentHeader(navigation, '', 'notifications');
    return () => { };
  }, [navigation]);

  useFocusEffect(
    React.useCallback(() => {
      setNotificationCount(notificationData.length);
    }, [notificationData])
  );

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

  const applyHandler = async (data: any) => {

    const lowerCaseKeys = Object.keys(data).filter(key => data[key]).map(item => item.trim().toLowerCase());
    setSelectedCheckbox(data);
    closeDrawerHandler();

    if (lowerCaseKeys.length > 0) {
      const response = await fetch(`${API_URL}latest/movie-show/filtered`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({
          filterData: lowerCaseKeys
        })
      });
      const resp = await response.json();
      if (resp.data.length > 0) {
        setFilteredData(resp.data);
      }
    } else {
      getLatestMovieShowList();
    }
  };

  const notificationHandler = React.useCallback(() => {
    navigation.navigate("Notification");
  }, [navigation]);

  const routes = React.useMemo(
    () => [
      {
        key: 'latest',
        render: () => (
          <View style={styles.tabViewBtn}>
            <Text style={styles.tabText}>Latest</Text>
          </View>
        ),
      },
      {
        key: 'movie',
        render: () => (
          <View style={styles.tabViewBtn}>
            <Text style={styles.tabText}>Movies</Text>
          </View>
        ),
      },
      {
        key: 'show',
        render: () => (
          <View style={styles.tabViewBtn}>
            <Text style={styles.tabText}>Shows</Text>
          </View>
        ),
      }
    ],
    []
  );

  const renderTabBar = (props: SceneRendererProps & { navigationState: State }) => (
    <View style={styles.renderTabBar}>
      <TouchableOpacity style={[styles.tabItem]}>
        <View style={styles.tabViewLogoBtn}>
          <FastImage
            style={styles.logoImg}
            source={require('../../assets/images/small-logo.png')}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
      </TouchableOpacity>
      {props.navigationState.routes.map((route, i) => (
        <TouchableOpacity key={route.key} onPress={() => setIndex(i)} style={[styles.tabItem, index === i && styles.activeTab]}>
          {/* {route.render && route.render()}                     */}
          <View style={styles.tabViewBtn}>
            <Text style={[styles.tabText, {color: index === i ? Colors.tabActiveColor :Colors.whiteColor }]}>{route['key']}</Text>
          </View>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={[styles.tabItem]}>
        <View style={[styles.childWrapper, styles.notificationWrapper]}>
          <Pressable
            hitSlop={hitSlops()}
            onPress={notificationHandler}
            style={styles.notificationBtn}
          >
            <FastImage
              style={styles.icon}
              source={require('../../assets/images/icons/notification-w.png')}
              resizeMode={FastImage.resizeMode.contain}
            />
            {notificationCount > 0 && (<Text style={styles.notificationText}>{notificationCount}</Text>)}
          </Pressable>
        </View>
      </TouchableOpacity>


    </View>
  );


  const renderScene = ({ route }: { route: Route }) => {
    switch (route.key) {
      case 'latest':
        return (<LatestMovieShowList filteredData={filteredData} />);
      case 'movie':
        return (<MovieList />);
      case 'show':
        return (<ShowList />);
      default:
        console.log('Default');
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* <Header onPressedHandler={onHeaderPressedHandler} navigation={navigation} notificationCount={notificationCount} />   */}
      <View style={styles.movieList}>
        <React.Suspense fallback={<Loading />}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            renderTabBar={renderTabBar}
            initialLayout={{ width: width }}
          />
        </React.Suspense>
      </View>

      {isVisibleDrawer && <View style={styles.drawerMainWrapper}><LanguageDrawer visible={isVisibleDrawer} onCancelHandler={closeDrawerHandler} onApplyHandler={applyHandler} getSelectedLanguage={selectedCheckbox} /></View>}
      <View style={styles.filterWrapper}>
        <Pressable style={styles.filteredBtnWrapper} onPress={toggleDrawerHandler}>
          <FastImage style={styles.icon} source={require('../../assets/images/icons/filter-y.png')} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  renderTabBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.blackColor
  },
  tabViewLogoBtn: {
    flexWrap: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabViewBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabText: {
    fontWeight:'600',
    fontFamily:Fonts.Family.Bold,
    color:Colors.whiteColor, 
    fontSize:Fonts.Size.Small + 3,
    textTransform:'capitalize'
  },
  notificationText: {
    position: 'absolute',
    bottom: 15,
    left: 12,
    width: 20,
    height: 20,
    borderRadius: 50,
    textAlign: 'center',
    color: Colors.whiteColor,
    fontFamily: Fonts.Family.Bold,
    fontSize: Fonts.Size.X_Small
  },
  notificationBtn: {
    position: 'relative'
  },
  childWrapper: {
    height: 50,
  },
  notificationWrapper: {
    paddingRight: 15,
    alignItems: 'flex-end',
    justifyContent: 'center',
    flex: 1,
    position: 'relative'
  },
  tabItem: {
    // flex: 1,
    flexGrow:1,
    alignItems: 'center',
    padding: 10,
    paddingHorizontal:15,
    justifyContent: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent'    
  },
  activeTab: {
    borderBottomColor: Colors.tabActiveColor
  },
  logoImg: {
    width: 80,
    height: 35
  },

  icon: {
    width: 25,
    height: 25
  },
  drawerMainWrapper: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15
  },

  filteredBtnWrapper: {
    width: 40,
    height: 40,
    backgroundColor: Colors.darkBackgroudColor,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: Colors.blackColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
    borderWidth: 3,
    borderColor: Colors.tabActiveColor
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
    position: 'relative'
  },
  movieList: {
    flex: 1,
    backgroundColor: Colors.blackColor,
    justifyContent: 'center',
    position: 'relative',
    zIndex: 0
  },
  text: {
    color: Colors.whiteColor,
    fontSize: 50
  },
  filterWrapper: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 9,
    bottom: 15,
    right: 15,
    width: 40,
    height: 40
  }
});

export default HomeScreen;
