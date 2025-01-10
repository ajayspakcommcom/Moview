import React, { useEffect, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Dimensions, ScrollView, Button } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';
import RightArrow from '../Ui/RightArrow';
import Toast from 'react-native-toast-message';
import { useAuth } from '../../context/AuthContext';
import { API_URL } from '../../configure/config.ios';

interface Props {
  userId: string;
  showId: string;
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

const ReportShowModal: React.FC<Props> = ({ userId, showId, reviewId, visible, cancel }) => {

  const { userDetail, user } = useAuth();

  const handleCloseModal = React.useCallback(() => {
    cancel?.();
  }, [cancel]);

  const saveReportHadnler = React.useCallback(async (text: string) => {

    const postObj = {
      "user": userId,
      "show": showId,
      "review": reviewId,
      "reason": text,
    };

    const response = await fetch(`${API_URL}show-report-review`, {
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
      setTimeout(() => {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Thank you! Your report has been submitted.',
          position: 'bottom',
          autoHide: true,
          visibilityTime: 3000,
        });
      }, 500);
    } else {
      Alert.alert('', 'Show went wrong.')
    }

  }, [userId, showId, reviewId]);

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

export default React.memo(ReportShowModal);
