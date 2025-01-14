import React, { useEffect, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import Colors from '../../styles/Colors';
import Toast from 'react-native-toast-message';
import { useAuth } from '../../context/AuthContext';
import { API_URL } from '../../configure/config.ios';
import LinearGradient from 'react-native-linear-gradient';
import ReviewForm from './ReviewForm';
import Fonts from '../../styles/Fonts';

interface Props {
  userId: string;
  movieId: string;  
  visible?: boolean;
  cancel?: () => void;
}


const MovieReviewFormModal: React.FC<Props> = ({ userId, movieId, visible, cancel }) => {

  const { user } = useAuth();

  const handleCloseModal = React.useCallback(() => {
    console.log('Ram...');
    cancel?.();
  }, [cancel]);

  const saveReportHadnler = React.useCallback(async (text: string) => {

    const postObj = {
      "user": userId,
      "movie": movieId
    };

    const response = await fetch(`${API_URL}moview-report-review`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${user?.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...postObj })
    });

    const resp = await response.json();

    if (resp.status === 'success') {
      cancel?.();
    } else {
      Alert.alert('', 'Somethong went wrong.')
    }

  }, [userId, movieId]);

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Modal presentationStyle="fullScreen" animationType="slide" transparent={true} visible={true} onRequestClose={handleCloseModal}>
          <View style={styles.centeredViewInner}>
            <LinearGradient colors={[Colors.startModalGradientColor, Colors.blackColor]} start={{ x: 0, y: 0.0001 }} end={{ x: 0, y: 1 }} style={styles.modalView}>              
                <Pressable style={[styles.button, styles.closeBtn]} onPress={handleCloseModal}>
                  <FastImage style={styles.closeIcon} source={require('../../assets/images/icons/close-y.png')} />
                </Pressable>
                <ScrollView style={styles.content}>          
                  <View style={styles.titleTextWrapper}>
                    <Text style={styles.titleText}>{'This is Hello World'}</Text>
                  </View>        
                    <ReviewForm  onPress={() => console.log()} />                  
                </ScrollView>              
            </LinearGradient>
          </View>
        </Modal>
        <Toast />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  titleTextWrapper: {
    padding:15
  },
  titleText: {
    color:Colors.tabActiveColor,     
    fontFamily: Fonts.Family.Bold,
    fontSize: Fonts.Size.Medium + 1,
    textTransform: 'uppercase',
    marginBottom: 2
  },
  content:{
    flex:1,    
    width:'100%',    
    paddingTop:50
  },
  centeredViewInner: {
    flex: 1,
    justifyContent: 'flex-end'           
  },
  modalView: {
    position: 'relative',
    height: Dimensions.get('screen').height - 60,    
    width: Dimensions.get('screen').width,        
    alignItems: 'center',
    justifyContent: 'flex-start',
    shadowColor: Colors.blackColor,           
  },
  button: {    
    padding: 10    
  },
  closeBtn: {
    position: 'absolute',
    top: 5,
    right: 5, 
    zIndex:9
  },
  closeIcon: {
    width: 50,
    height: 50
  }
});

export default React.memo(MovieReviewFormModal);
