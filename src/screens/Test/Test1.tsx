import * as React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { Text } from 'react-native-paper';
import { TabView, SceneMap } from 'react-native-tab-view';

const ZeroRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#673ab7', justifyContent:'center', alignItems:'center' }} ><Text style={{color:'#fff', fontSize:30}}>0</Text></View>
);

const FirstRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#673ab7', justifyContent:'center', alignItems:'center' }} ><Text style={{color:'#fff', fontSize:30}}>1</Text></View>
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#673ab7', justifyContent:'center', alignItems:'center' }} ><Text style={{color:'#fff', fontSize:30}}>2</Text></View>
);

const renderScene = SceneMap({
  zero:ZeroRoute,
  first: FirstRoute,
  second: SecondRoute,
});

const routes = [
  { key: 'zero', title: 'Zero' },
  { key: 'first', title: 'First' },
  { key: 'second', title: 'Second' },
];

export default function Test() {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(1);

  const handleIndexChange = (newIndex: number) => {        
    if (routes[newIndex].key === 'zero') {
      setIndex(1);
    }  else {
      setIndex(newIndex);
    }
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={handleIndexChange}
      initialLayout={{ width: layout.width }}
    />
  );
}
