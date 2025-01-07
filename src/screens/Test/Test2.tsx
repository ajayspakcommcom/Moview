import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import Fonts from '../../styles/Fonts';
import Colors from '../../styles/Colors';


const Test2 = () => {

  const [checked, setChecked] = React.useState(true);
  
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <View style={styles.flatItem}>
          {checked ? <Pressable onPress={() => setChecked(!checked)}><FastImage style={styles.icon} source={require('../../assets/images/icons/checked.png')} /></Pressable> : <Pressable onPress={() => setChecked(!checked)}><FastImage style={styles.icon} source={require('../../assets/images/icons/unchecked.png')} /></Pressable>}
          <Text style={styles.checkboxLabel} onPress={() => setChecked(!checked)}>{'Terms'}</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  checkboxLabel: {
    marginLeft: 5,
    fontSize: Fonts.Size.Medium,
    color: Colors.whiteColor,
  },
  icon: {
    width: 25,
    height: 25
  },
  flatItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingLeft: 10
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:Colors.darkBackgroudColor
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Test2;