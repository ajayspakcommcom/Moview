import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Text } from 'react-native-paper';
import { Image } from 'react-native-svg';
import { TabView, SceneMap, SceneRendererProps, NavigationState } from 'react-native-tab-view';

type Route = {
  key: string;  
  render?: () => React.ReactNode;
};

type State = NavigationState<Route>;

const routes:Route[] = [
  { 
    key: 'logo',     
    render: () => (      
         <View style={{flexGrow:1, alignItems:'center', justifyContent:'center'}}><FastImage style={styles.logoImg} source={require('../../assets/images/small-logo.png')} resizeMode={FastImage.resizeMode.contain} /></View>   
    )
  },
  { 
    key: 'latest',     
    render: () => (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}><Text style={{ color: '#fff', fontSize: 13 }}>Latest</Text></View>
    )
  },
  { 
    key: 'movie',     
    render: () => (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}><Text style={{ color: '#fff', fontSize: 13 }}>Movies</Text></View>
    )
  },
  { 
    key: 'show',     
    render: () => (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}><Text style={{ color: '#fff', fontSize: 13 }}>Shows</Text></View>
    )
  },
];

const Test1: React.FC = () => {

  const {width} = Dimensions.get('screen');
  const [index, setIndex] = React.useState(0);

  const renderTabBar = (props: SceneRendererProps & { navigationState: State }) => (
    <View style={{ flexDirection: 'row', backgroundColor:'#000' }}>
      {props.navigationState.routes.map((route, i) => (
        <TouchableOpacity key={route.key} onPress={() => setIndex(i)} style={[{ flex: 1, alignItems: 'center', padding: 10, }, styles.tabItem, index === i && styles.activeTab]}>
          {route.render && route.render()}
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderScene = ({ route }: { route: Route }) => {
    switch (route.key) {
      case 'logo':
        return <View style={{ flex: 1, backgroundColor: '#ff4081' }} />;
      case 'latest':
        return <View style={{ flex: 1, backgroundColor: '#673ab7' }} />;
      case 'movie':
        return <View style={{ flex: 1, backgroundColor: '#4caf50' }} />;
      case 'show':
        return <View style={{ flex: 1, backgroundColor: 'yellow' }} />;
      default:
        return null;
    }
  };

  return (
    <TabView
    navigationState={{ index, routes }}
    renderScene={renderScene}
    onIndexChange={setIndex}
    renderTabBar={renderTabBar}
    initialLayout={{width:width}}
  />
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }, 
  logoImg: {
    width: 80,
    height: 35
},
tabItem: {
  flex: 1,
  alignItems: 'center',
  padding: 10,
  borderBottomWidth: 2,
  borderBottomColor: 'transparent',
},
activeTab: {
  borderBottomColor: '#fff', // Highlight color for the active tab
},
});

export default React.memo(Test1);
