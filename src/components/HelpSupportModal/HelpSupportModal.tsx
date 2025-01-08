import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Dimensions, Linking } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';

// Constants
const SUPPORT_EMAIL = 'moviu.support@spakcomm.com';
const SUPPORT_WEBSITE = 'http://moviu.in/';
const EMAIL_SUBJECT = 'Contacting via App';
const EMAIL_BODY = 'Hello, I would like to contact you regarding...';

interface Props {
  visible?: boolean;
  cancel?: () => void;
  title?: string;
}

const HelpSupportModal: React.FC<Props> = ({ visible, cancel, title }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const emailHandler = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const emailUrl = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(EMAIL_SUBJECT)}&body=${encodeURIComponent(EMAIL_BODY)}`;
      
      const canOpen = await Linking.canOpenURL(emailUrl);
      console.log('Can open email URL:', canOpen);
      if (!canOpen) {
        Alert.alert('Error', 'Email client not configured or available on your device');
        return;
      }

      await Linking.openURL(emailUrl);
    } catch (err) {
      console.error('Error opening email client:', err);
      Alert.alert('Error', 'Could not open email client');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const websiteHandler = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const canOpen = await Linking.canOpenURL(SUPPORT_WEBSITE);
      if (!canOpen) {
        Alert.alert('Error', 'Could not open the website');
        return;
      }

      await Linking.openURL(SUPPORT_WEBSITE);
    } catch (err) {
      console.error('Error opening website:', err);
      Alert.alert('Error', 'Could not open the website');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleCloseModal = React.useCallback(() => {
    setModalVisible(false);
    cancel?.();
  }, [cancel]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <Modal
          presentationStyle="formSheet"
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleCloseModal}>
          <View style={styles.centeredViewInner}>
            <View style={styles.modalView}>
              <Pressable
                style={[styles.button, styles.closeBtn]}
                onPress={handleCloseModal}>
                <FastImage 
                  style={styles.closeIcon} 
                  source={require('../../assets/images/icons/close-y.png')} 
                />
              </Pressable>
              
              <View style={styles.contentWrapper}>
                <Text style={styles.title}>Help & Support</Text>
                <Text style={styles.instructions}>
                  If you need assistance, you can contact us through email or visit our support website for more help.
                </Text>
                
                <View style={styles.buttonContainer}>
                  <Pressable 
                    style={[styles.emailBtn, isLoading && styles.buttonDisabled]}
                    onPress={emailHandler}
                    disabled={isLoading}>
                    <Text style={styles.emailText}>Contact Us via Email</Text>
                  </Pressable>

                  <Pressable 
                    style={[styles.emailBtn, isLoading && styles.buttonDisabled]}
                    onPress={websiteHandler}
                    disabled={isLoading}>
                    <Text style={styles.emailText}>Visit Support Website</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </Modal>

        <Pressable 
          style={styles.footerBtns} 
          onPress={() => setModalVisible(true)}>
          <Text style={styles.footerBtnText}>Help & Support</Text>
        </Pressable>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
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
  contentWrapper: {
    flex: 1,
    marginTop: 70,
    width: '100%',
    padding: 15
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20
  },
  title: {
    fontWeight: '600',
    fontSize: Fonts.Size.X_Large,
    textAlign: 'center',
    marginBottom: 20,
    color: Colors.whiteColor
  },
  instructions: {
    fontWeight: '300',
    fontSize: Fonts.Size.Medium,
    textAlign: 'center',
    color: Colors.whiteColor
  },
  emailBtn: {
    backgroundColor: Colors.blueColor,
    borderRadius: 20,
    width: 200,
    padding: 10,
    marginTop: 15
  },
  buttonDisabled: {
    opacity: 0.5
  },
  emailText: {
    textAlign: 'center',
    color: Colors.whiteColor,
    fontSize: Fonts.Size.Medium,
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
  footerBtns: {
    backgroundColor: Colors.darkBackgroudColor,
    borderColor: Colors.whiteColor,
    borderWidth: 2,
    alignItems: 'center',
    width: '100%',
    height: 50,
    alignContent: 'center',
    justifyContent: 'center'
  },
  footerBtnText: {
    color: Colors.whiteColor
  }
});

export default React.memo(HelpSupportModal);
