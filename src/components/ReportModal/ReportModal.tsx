import React, { useEffect, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Dimensions, ScrollView, Button } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';
import RightArrow from '../Ui/RightArrow';
import Toast from 'react-native-toast-message';

interface Props {
  userId: string;
  movieId: string;
  reviewId: string;
  visible?: boolean;
  cancel?: () => void;  
}

const reportItems = [
  "It's spam",
  "Nudity or sexual activity",
  "Hate speech or symbols",
  "Violence or dangerous organizations",
  "Sale of illegal or regulated goods",
  "Bullying or harassment",
  "Intellectual property violation",
  "Scam or fraud"
];

const ReportModal: React.FC<Props> = ({ userId, movieId, reviewId, visible, cancel }) => {

  const handleCloseModal = React.useCallback(() => {
    cancel?.();
  }, [cancel]);

  const saveReportHadnler = React.useCallback((text: string) => {


    const testData = {
        "user": "63f1b3e9f4d50e12c8b56789",
        "movie": "63f1b3e9f4d50e12c8b5678a",
        "review": "63f1b3e9f4d50e12c8b5678b",
        "reason": "Inappropriate Content...",           
      }
    
    console.log('text',text);
    console.log('userId', userId);
    console.log('movieId', movieId);
    console.log('reviewId', reviewId);

    const postObj = {
      "user": userId,
      "movie": movieId,
      "review": reviewId,
      "reason": text,   
    };

    console.log('post', postObj);


    cancel?.();    
    setTimeout(() => {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Thank you! Your report has been submitted.',
        position: 'bottom',      
        autoHide: true, // Ensures the toast hides automatically
        visibilityTime: 3000, // Toast will be visible for 5 seconds
      });
    }, 500);
  }, [userId, movieId, reviewId]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <Modal presentationStyle="formSheet" animationType="slide" transparent={true} visible={visible} onRequestClose={handleCloseModal}>
          <View style={styles.centeredViewInner}>
            <View style={[styles.modalView]}>
              <Pressable style={[styles.button, styles.closeBtn]} onPress={handleCloseModal}>
                <FastImage style={styles.closeIcon} source={require('../../assets/images/icons/close-y.png')} />
              </Pressable>
              <ScrollView style={[styles.scrollViewContainer]}>
                <View style={styles.listContainer}>
                  {reportItems.map((item, index) => (
                    <Pressable key={index} style={styles.listItem} onPress={() => saveReportHadnler(item)}>
                      <View style={styles.listInnerItem}>
                        <Text style={styles.listText}>{item}</Text>
                        <RightArrow />
                      </View>
                      <View style={styles.separator} />
                    </Pressable>
                  ))}
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
        <Toast />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    marginTop: 30,
    flex: 1,
    width: '100%',
    zIndex: -1
  },
  listContainer: {
    marginTop: 20,
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },

  listItem: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 20
  },
  listInnerItem: {
    justifyContent: 'space-between',
    // backgroundColor:'red', 
    flexDirection: 'row'
  },
  listText: {
    color: Colors.whiteColor,
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.tagBorderColor,
    width: '100%',
    marginTop: 15,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: Colors.backgroundColorShadow
  },
  centeredViewInner: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: Colors.backgroundColorShadow
  },
  modalView: {
    position: 'relative',
    height: Dimensions.get('screen').height - 200,
    minHeight: 200,
    width: Dimensions.get('screen').width,
    margin: 20,
    backgroundColor: Colors.darkBackgroudColor,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.blackColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  closeBtn: {
    position: 'absolute',
    top: 5,
    right: 5
  },
  closeIcon: {
    width: 50,
    height: 50
  },

});

export default React.memo(ReportModal);
