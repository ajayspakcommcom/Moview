import * as React from 'react';
import { View,  StyleSheet, Alert,  ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';



type Props = {

};

const Test1: React.FC<Props> = () => {


    return (
      
      <View>
        
      </View>
      
    )
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    marginBottom: 20,
},
    keypad: {
        flexGrow: 1,
        backgroundColor: Colors.darkBackgroudColor
    },
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    logo: {
        width: 150,
        height: 72,
        //marginBottom: 40,
    },
    honest: {
        color: Colors.whiteColor,
        marginBottom: 40,
        fontFamily: Fonts.Family.Medium,
        fontSize: Fonts.Size.Small,
    },

    errorWrapper: {
        paddingBottom: 0
    },

    errorText: {
        color: Colors.redColor,
        fontFamily: Fonts.Family.Medium,
        fontSize: Fonts.Size.Medium,
    },

    button: {
        width: '100%',
        height: 50,
        backgroundColor: 'blue',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    rememberForgot: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: Colors.whiteColor,
        paddingRight: 10,
        display: 'none'
    },

    rememberCheckbox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    remember: {
        color: Colors.whiteColor,
        fontSize: Fonts.Size.Small,
    },

    forgotText: {
        color: Colors.whiteColor,
        fontSize: Fonts.Size.Small,
        textDecorationLine: 'underline'
    },

    skipWrapper: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },

    skipText: {
        fontSize: Fonts.Size.X_Large - 3,
        color: Colors.whiteColor,
        fontFamily: Fonts.Family.Light,
        marginBottom: 30,
        marginTop: 80,
        display: 'none'
    },

    skipDont: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
    },
    skipBottomText: {
        color: Colors.whiteColor,
        fontFamily: Fonts.Family.Medium,
        fontSize: Fonts.Size.Small,
        lineHeight: 20
    },
    registerBtnPressable: {
        width: '100%',
        marginTop: 20
    },
    registerBtnWrapper: {
        borderWidth: 2,
        borderColor: Colors.whiteColor,
        width: '100%',
        alignItems: 'center',
        padding: 15
    },
    messageInput: {
        height: 100,
        textAlignVertical: 'top',
    },
});

export default Test1;
