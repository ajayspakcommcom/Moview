import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Dimensions, Linking } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Colors from '../../styles/Colors';
import FastImage from 'react-native-fast-image';
import Fonts from '../../styles/Fonts';

interface Props {
  visible?: boolean;
  cancel?: () => void;
  title?: string;
}

const HelpSupportModal: React.FC<Props> = ({ visible, cancel, title }) => {
  const [modalVisible, setModalVisible] = useState(false);
  
  const emailHandler = React.useCallback(async () => {    
   
    
    const email = 'contact@spakcomm.com';
    const subject = 'Contacting via App';
    const body = 'Hello, I would like to contact you regarding...';  

    const emailUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    console.clear();
    console.log(emailUrl);
    const canOpen = await Linking.canOpenURL(emailUrl);

    if (canOpen) {
      Linking.openURL(emailUrl).catch((err) => {
        console.error('Error opening email client', err);
        Alert.alert('Error', 'Could not open email client');
      });
    } else {
      Alert.alert('Error', 'Email client not configured or available on your device');
    }

  }, []);


  const websiteHandler = React.useCallback(() => {        
    const url = 'http://moviu.in/';
    Linking.openURL(url).catch((err) => console.error('An error occurred', err));    
  }, []);


  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <Modal
          presentationStyle={'formSheet'}
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredViewInner}>
            <View style={styles.modalView}>              
              <Pressable
                style={[styles.button, styles.closeBtn]}
                onPress={() => setModalVisible(!modalVisible)}>                
                <FastImage style={{width:50, height:50}}  source={require('../../assets/images/icons/close-w.png')} />
              </Pressable>
              <View style={styles.contentWrapper}>
                  <Text style={styles.title}>Help & Support</Text>
                  <Text style={styles.instructions}>If you need assistance, you can contact us through email or visit our support website for more help.</Text>
                <View style={styles.emailBtnWrapper}>
                  <Pressable style={[styles.emailBtn]} onPress={emailHandler}>
                    <Text style={styles.emailText}>Contact Us via Email</Text>
                  </Pressable>
                </View>
                <View style={styles.emailBtnWrapper}>
                  <Pressable style={[styles.emailBtn]} onPress={websiteHandler}>
                    <Text style={styles.emailText}>Visit Support Website</Text>
                  </Pressable>
                </View>
              </View> 
            </View>
          </View>
        </Modal>

        <Pressable style={styles.footerBtns} onPress={() => setModalVisible(true)}>
          <Text style={styles.footerBtnText}>Help & Support</Text>
        </Pressable>

      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  footerBtns: {
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
    position:'relative',
    height:Dimensions.get('screen').height - 200,
    minHeight:200,
    width:Dimensions.get('screen').width - 0,
    margin: 20,
    backgroundColor: Colors.inputBackgroundColor, //Colors.whiteColor,
    borderRadius: 50,    
    alignItems: 'center',
    justifyContent:'center',
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
    marginTop:70, 
    width:'100%',
    padding:15
  },
  title: {
    fontWeight:'600',
    fontSize:Fonts.Size.X_Large,
    textAlign:'center', 
    marginBottom:20
  },
  instructions: {
    fontWeight:'300',
    fontSize:Fonts.Size.Medium,
    textAlign:'center'
  },
  emailBtnWrapper: {
    marginHorizontal:'auto'
  },
  emailBtn: {
    backgroundColor:'#007AFF', 
    borderRadius:20, 
    textAlign:'center', 
    flexShrink:1,
    width:200,
    padding:10, 
    marginTop:15
  },
  emailText: {
    textAlign:'center',
    color:Colors.whiteColor,
    fontSize:Fonts.Size.Medium,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  closeBtn: {
    position: 'absolute',
    top:5,
    right:5    
  },
  textStyle: {
    color: Colors.blackColor,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default React.memo(HelpSupportModal);
