import React from 'react';
import {RefreshControl, ScrollView, StyleSheet, Text, Linking, TouchableOpacity} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';



const Test6 = () => {

  const openLink = () => {    
    const url = 'https://astaracademy.in/index.html';
    Linking.openURL(url).catch((err) => console.error('An error occurred', err));    
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={openLink}>
        <Text style={{ color: 'blue' }}>Open Link</Text>
      </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor:Colors.darkBackgroudColor
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Test6;