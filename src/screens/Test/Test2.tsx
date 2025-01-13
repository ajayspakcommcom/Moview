import React, { useState } from 'react';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';



const Test2 = () => {

  const showToast = () => {
   console.log('Ram...');
  };

  return (
    <View style={styles.container}>
      <Button title="Show Success Message" onPress={showToast} />
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Test2;