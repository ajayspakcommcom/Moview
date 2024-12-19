import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';


const TestScreen = () => {

  return (
    <View style={styles.container}>
      <Text>Hello World </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  } 
});

export default TestScreen;
