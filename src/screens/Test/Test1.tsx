import React from 'react';
import { View, Text, StyleSheet, ImageBackground, FlatList, TouchableOpacity, Pressable } from 'react-native';
import { TabView, SceneRendererProps, NavigationState } from 'react-native-tab-view';
import Fonts from '../../styles/Fonts';
import Colors from '../../styles/Colors';
import FastImage from 'react-native-fast-image';
import { Dimensions } from 'react-native';


type Route = {
  key: string;
  render?: () => React.ReactNode;
};

type State = NavigationState<Route>;

const Test1: React.FC = () => {

  const [index, setIndex] = React.useState(0);
  const { width } = Dimensions.get('screen');

  const routes = React.useMemo(
    () => [
      {
        key: 'movies',
        render: () => (
          <View style={styles.tabViewBtn}>
            <Text style={styles.tabText}>Movies</Text>
          </View>
        ),
      },
      {
        key: 'shows',
        render: () => (
          <View style={styles.tabViewBtn}>
            <Text style={styles.tabText}>Shows</Text>
          </View>
        ),
      }
    ],
    []
  );

  const renderScene = ({ route }: { route: Route }) => {
    switch (route.key) {
      case 'movies':
        return (<View style={styles.sceneWrapper}><Text style={{ color: Colors.blackColor }}>Movies</Text></View>);
      case 'shows':
        return (<View style={styles.sceneWrapper}><Text style={{ color: Colors.blackColor }}>Show</Text></View>);
      default:
        console.log('Default');
        return null;
    }
  };

  const renderTabBar = (props: SceneRendererProps & { navigationState: State }) => (
    <View style={styles.renderTabBar}>
      {props.navigationState.routes.map((route, i) => (
        <TouchableOpacity key={route.key} onPress={() => setIndex(i)} style={[styles.tabItem, index === i && styles.activeTab]}>
          <View style={styles.tabViewBtn}>
            <Text style={[styles.tabText, { color: index === i ? Colors.tabActiveColor : Colors.whiteColor }]}>{route['key']}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );


  return (
    <TabView
      style={{ backgroundColor: Colors.backgroundColorShadow }}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={renderTabBar}
      initialLayout={{ width: width }}
    />
  )
};

const styles = StyleSheet.create({
  tabText: {
    fontWeight: '600',
    fontFamily: Fonts.Family.Bold,
    color: Colors.whiteColor,
    fontSize: Fonts.Size.Small + 3,
    textTransform: 'capitalize'
  },
  sceneWrapper: {
    backgroundColor: 'red',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  renderTabBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.backgroundColorShadow,
    height: 60
  },
  tabViewLogoBtn: {
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabViewBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabItem: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 10,
    paddingHorizontal: 15,
    justifyContent: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent'
  },
  activeTab: {
    borderBottomColor: Colors.tabActiveColor
  }
});

export default Test1;
