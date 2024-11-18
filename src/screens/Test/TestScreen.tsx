import React from 'react';
import {FlatList, Text, View, StyleSheet} from 'react-native';
import TestComponent from '../../components/TestComponent/TestComponent';
import LanguageDrawer from '../../components/LanguageDrawer/LanguageDrawer';

const TestScreen = () => {

  return (
    <View style={styles.container}>
      {/* <TestComponent />  */}
      <LanguageDrawer />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'pink',
        padding: 10,
      }      
});

export default TestScreen;
