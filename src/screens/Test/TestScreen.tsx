import React from 'react';
import {View, StyleSheet} from 'react-native';
import TestComponent from '../../components/TestComponent/TestComponent';


const TestScreen = () => {

  return (
    <View style={styles.container}>
      <TestComponent />       
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
        padding: 10,
      }      
});

export default TestScreen;
