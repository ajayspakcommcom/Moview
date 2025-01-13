import { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, TextInput, Button, Text, ActionSheetIOS, Image } from 'react-native';
import { BlurView } from '@react-native-community/blur';





type Props = {

};

const Test1: React.FC<Props> = () => {

  return (
<View style={styles.container}>
      {/* <Image
        key={'blurryImage'}
        source={{ uri }}
        style={styles.absolute}
      /> */}
      <Text style={styles.absolute}>Hi, I am some blurred text</Text>
      {/* in terms of positioning and zIndex-ing everything before the BlurView will be blurred */}
      <BlurView
        style={styles.absolute}
        blurType="light"
        blurAmount={10}
        reducedTransparencyFallbackColor="white"
      />
      <Text>I'm the non blurred text because I got rendered on top of the BlurView</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});

export default Test1;
