import * as React from 'react';
import { View, StyleSheet, ScrollView, Pressable, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Colors from '../../styles/Colors';
import { useAuth } from '../../context/AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Fonts from '../../styles/Fonts';
import { capitalizeFirstLetter } from '../../utils/Common';
import { API_URL } from '../../configure/config.android';
import { Text } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import FastImage from 'react-native-fast-image';

const AlertDialog = React.lazy(() => import('../../components/AlertDialog/AlertDialog'));
const CustomButton = React.lazy(() => import('../../components/Ui/CustomButton'));
const UserProfileForm = React.lazy(() => import('../../components/UserProfileForm/UserProfileForm'));

import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store/index';
import { useFocusEffect } from '@react-navigation/native';
import { fetchFollowings } from '../../store/slices/followingSlice';
import { fetchFollowers } from '../../store/slices/followerSlice';


const TestScreen = () => {

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView behavior={'height'} style={{flex:1, backgroundColor:'red'}}>
                <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{flex:1, backgroundColor:'pink'}}>
                
                    <View style={{flex:1}}>
                        <UserProfileForm  />
                    </View>

                    {/* <View style={styles.logoWrapper}>
                        <FastImage style={styles.logoImg} source={require('../../assets/images/small-logo.png')} resizeMode={FastImage.resizeMode.contain} />
                        <Text style={styles.honest}>Honest Movie Reviews</Text>
                    </View> */}
                        
                </ScrollView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
 
withoutLoginWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15
},
logoWrapper: {        
    alignItems: 'center'
},
logoImg: {
    width: 122,
    height: 50
},
honest: {
    fontFamily: Fonts.Family.Medium,
    fontSize: Fonts.Size.Small - 2,
    color: Colors.whiteColor,
},
container: {
    flex: 1,
},
innerContainer: {
    flex: 1,
},
editWrapper: {
    paddingTop: 30,
    paddingHorizontal: 30,
    alignItems: 'flex-end'
},
editIcon: {
    color: Colors.whiteColor
},
header: {
    width: '100%',
    minHeight: 200,
    justifyContent: 'center',
    alignContent: 'center',
    flexWrap: 'wrap',
},
headerContent: {
    width: '80%', //200,
    minHeight: 200,
    justifyContent: 'center',
    alignContent: 'center',
    flexWrap: 'wrap',
},
userTextIcon: {
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row'
},
userIcon: {
    backgroundColor: Colors.whiteColor,
    width: 80,
    height: 80,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center'
},
icon: {
    textAlign: 'center'
},
userTextWrapper: {
    width: '100%',
    minHeight: 50,
    //backgroundColor:'red'
},
name: {
    marginTop: 10,
    color: Colors.whiteColor,
    textAlign: 'center',
    fontFamily: Fonts.Family.Bold,
    fontSize: Fonts.Size.Medium + 10,
    lineHeight: 30
},
critic: {
    color: Colors.whiteColor,
    textAlign: 'center',
    fontFamily: Fonts.Family.Medium,
    fontSize: Fonts.Size.Small,
    lineHeight: 22,
    marginTop: 5
},
followerWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap'
},
movies: {
    marginRight: 15,
    borderRightColor: Colors.whiteColor,
    padding: 15,
},
followers: {
    marginRight: 15,
    borderRightColor: Colors.whiteColor,
    padding: 15
},
following: {
    padding: 15
},
follText: {
    textAlign: 'center',
    fontFamily: Fonts.Family.Medium,
    fontSize: Fonts.Size.Medium,
    color: Colors.whiteColor
},
myMoviesWrapper: {
    width: '100%',
    minHeight: 200,
    paddingHorizontal: 30
},
movieHeaderText: {
    paddingTop: 20,
    fontFamily: Fonts.Family.Bold,
    fontSize: Fonts.Size.Medium + 2,
    color: Colors.whiteColor
},
hr: {
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
    minHeight: 2,
    backgroundColor: Colors.tabBgColor,
    borderRadius: 50
},
footerWrapper: {
    paddingTop: 25
},
footerItem: {
    flexWrap: 'nowrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
},
footerIcon: {
    color: Colors.tabActiveColor,
    fontSize: Fonts.Size.XX_Large,
    width: 40,
    textAlign: 'center',
    marginBottom: 20
},
footerText: {
    color: Colors.whiteColor,
    paddingLeft: 15,
    paddingTop: 5
},
spacer: {
    padding: 15
}
});

export default TestScreen;
