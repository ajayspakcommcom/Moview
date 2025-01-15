import React from 'react';
import { View, Text, StyleSheet, ImageBackground, FlatList, TouchableOpacity, Pressable, Alert, SafeAreaView, Button } from 'react-native';
import { TabView, SceneRendererProps, NavigationState } from 'react-native-tab-view';
import Fonts from '../../styles/Fonts';
import Colors from '../../styles/Colors';
import FastImage from 'react-native-fast-image';
import { Dimensions } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';


type Route = {
  key: string;
  render?: () => React.ReactNode;
};

type State = NavigationState<Route>;

const Test1: React.FC = () => {

  const createTwoButtonAlert = () =>
    Alert.alert('Are you sure want to logout?', '', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'destructive',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Button title={'2-Button Alert'} onPress={createTwoButtonAlert} />        
      </SafeAreaView>
    </SafeAreaProvider>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 15
  }
});

export default Test1;
