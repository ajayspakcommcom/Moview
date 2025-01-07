import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import Colors from '../../styles/Colors';

interface Props {
  visible?: boolean;
  cancel?: () => void;
  title?: string;    
}

const HelpSupportModal: React.FC<Props> = ({}) => {
  const [modalVisible, setModalVisible] = useState(false);  
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>
              <Pressable
                style={[styles.button]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
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
  borderColor:Colors.whiteColor,
  borderWidth:2,
  alignItems:'center',
  width:'100%',
  height:50, 
  alignContent:'center', 
  justifyContent:'center'
},
footerBtnText: {
  color:Colors.whiteColor
},
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',     
    backgroundColor:Colors.backgroundColorShadow
  },
  modalView: {
    margin: 20,
    backgroundColor: Colors.whiteColor,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
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
    elevation: 2,
  },
 
  textStyle: {
    color: Colors.whiteColor,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default React.memo(HelpSupportModal);
