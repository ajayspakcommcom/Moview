import * as React from 'react';
import { View,  StyleSheet, Alert,  ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';
import CustomTextInput from '../../components/Ui/CustomTextInput';
import CustomButton from '../../components/Ui/CustomButton';



type Props = {

};

const ScrollWithForm: React.FC<Props> = () => {

    const [password, setPassword] = React.useState(''); //12345 // contact@12345
    const [loader, setLoader] = React.useState(false);
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [mobile, setMobile] = React.useState('');
    const [city, setCity] = React.useState('');
    const [state, setState] = React.useState('');
    const [address1, setAddress1] = React.useState('');
    const [address2, setAddress2] = React.useState('');
    const [message, setMessage] = React.useState('');

    const scrollViewRef = React.useRef<ScrollView>(null);

    return (
      
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 40}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView 
                    ref={scrollViewRef}
                    contentContainerStyle={[styles.container, { paddingBottom: 40 }]}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                >
                    <View style={styles.inputContainer}>
                        <CustomTextInput
                            placeholder="Full Name"
                            value={name}
                            onChangeText={setName}
                            autoCapitalize="words"
                            onFocus={() => {
                                scrollViewRef.current?.scrollTo({ y: 0 });
                            }}
                        />

                        <CustomTextInput
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            onFocus={() => {
                                scrollViewRef.current?.scrollTo({ y: 0 });
                            }}
                        />

                        {/* Continue for other inputs with increasing y values */}
                        <CustomTextInput
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            onFocus={() => {
                                scrollViewRef.current?.scrollTo({ y: 0 });
                            }}
                        />

                        <CustomTextInput
                            placeholder="Mobile Number"
                            value={mobile}
                            onChangeText={setMobile}
                            keyboardType="phone-pad"
                            onFocus={() => {
                                scrollViewRef.current?.scrollTo({ y: 0 });
                            }}
                        />

                        <CustomTextInput
                            placeholder="City"
                            value={city}
                            onChangeText={setCity}
                            onFocus={() => {
                                scrollViewRef.current?.scrollTo({ y: 0 });
                            }}
                        />

                        <CustomTextInput
                            placeholder="State"
                            value={state}
                            onChangeText={setState}
                            onFocus={() => {
                                scrollViewRef.current?.scrollTo({ y: 0 });
                            }}
                        />

                        <CustomTextInput
                            placeholder="Address Line 1"
                            value={address1}
                            onChangeText={setAddress1}
                            onFocus={() => {
                                scrollViewRef.current?.scrollTo({ y: 100 });
                            }}
                        />

                        <CustomTextInput
                            placeholder="Address Line 2"
                            value={address2}
                            onChangeText={setAddress2}
                            onFocus={() => {
                                scrollViewRef.current?.scrollTo({ y: 100 });
                            }}
                        />

                        <CustomTextInput
                            placeholder="Message"
                            value={message}
                            onChangeText={setMessage}
                            multiline
                            numberOfLines={4}
                            style={styles.messageInput}
                            onFocus={() => {                                
                                scrollViewRef.current?.scrollTo({ y: 200 });
                            }}
                        />

                        <CustomButton
                            title="Sign Up"
                            onPress={() => console.log('Submitted...')}
                            loading={loader}
                        />
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      
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

export default React.memo(ScrollWithForm);
