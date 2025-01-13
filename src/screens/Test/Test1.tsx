import { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, TextInput, Button, Text, ActionSheetIOS } from 'react-native';
import { GestureHandlerRootView, LongPressGestureHandler, TapGestureHandler } from 'react-native-gesture-handler';
import ReportMovieModal from '../../components/ReportModal/ReportMovieModal';
import LinearGradient from 'react-native-linear-gradient';




type Props = {

};

const Test1: React.FC<Props> = () => {




    return (
       <View style={styles.container}>
            <LinearGradient
            colors={['red', 'green']} 
            style={styles.container}    
    >
      <View style={styles.inner}>
        <Text style={styles.text}>Gradient Background</Text>
      </View>
    </LinearGradient>
       </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'red'
    },   
    inner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      text: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
      },
});

export default Test1;
