import * as React from 'react';
import { View, Text, StyleSheet, GestureResponderEvent, Alert, Pressable, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ScrollView, Linking } from 'react-native';
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';
import { StackNavigationProp } from '@react-navigation/stack';
import { API_URL } from '../../configure/config.ios';
import FastImage from 'react-native-fast-image';
import { hitSlops } from '../../utils/Common';
const CustomTextInput = React.lazy(() => import('../../components/Ui/CustomTextInput'));
const CustomButton = React.lazy(() => import('../../components/Ui/CustomButton'));

type Props = {
    navigation: StackNavigationProp<any>;
};

const RegisterScreen: React.FC<Props> = ({ navigation }) => {

    const [checked, setChecked] = React.useState(false);
    const [firstname, setFirstname] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [loader, setLoader] = React.useState(false);

    const handleLogin = React.useCallback(async () => {

        try {

            const fields = [
                { name: 'First name', value: firstname },
                { name: 'Username', value: username },
                { name: 'Password', value: password },
                { name: 'Phone', value: phone }
            ];

            const emptyField = fields.find(field => field.value.trim() === '');

            if (emptyField) {
                Alert.alert('Error', `${emptyField.name} is required`);
                return;
            } else {

                try {
                    setLoader(true);
                    const response = await fetch(`${API_URL}user`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            "firstname": firstname,
                            "username": username,
                            "email": username,
                            "phone": phone,
                            "password": password, 
                            "terms": checked 
                        }),
                    });

                    const result = await response.json();
                    if (result.status === 'success') {
                        setLoader(false);
                        Alert.alert('Registration Successfully', 'Thank you for your registration. We will contact you soon.', [{ text: 'OK', onPress: () => navigation.navigate('Login') }]);
                    } else {
                        Alert.alert('Error', `${result.message}`, [
                            { text: 'OK', onPress: () => setLoader(false) }
                        ]);
                    }

                } catch (error) {

                }
            }

        } catch (error) {
            console.error('Login error:', error);
            Alert.alert('Error', 'Login failed. Please try again.');
        }

    }, [checked])

    const handleFirstnameChange = (text: string) => {
        setFirstname(text);
    };

    const handleUsernameChange = (text: string) => {
        setUsername(text);
    };

    const handlePhoneChange = (text: string) => {
        setPhone(text);
    };

    const handlePasswordChange = (text: string) => {
        setPassword(text);
    };


    const goto = (screen: string) => {
        navigation.navigate(screen);
    };

     const termsConditionHandler = () => {    
        const url = 'https://astaracademy.in/index.html';
        Linking.openURL(url).catch((err) => console.error('An error occurred', err));    
      };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView behavior={'padding'} style={styles.keypad} keyboardShouldPersistTaps="handled">
                <ScrollView contentContainerStyle={styles.container}>
                    <FastImage
                        style={styles.logo}
                        source={require('../../assets/images/logo.png')}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                    <Text style={styles.honest}>Honest Movie Reviews</Text>

                    <CustomTextInput
                        placeholder="First name"
                        value={firstname}
                        onChangeText={handleFirstnameChange}
                        autoCapitalize="none"
                    />

                    <CustomTextInput
                        placeholder="Username"
                        value={username}
                        onChangeText={handleUsernameChange}
                        autoCapitalize="none"
                    />

                    <CustomTextInput
                        placeholder="Mobile"
                        value={phone}
                        onChangeText={handlePhoneChange}
                    />

                    <CustomTextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={handlePasswordChange}
                        secureTextEntry
                    />

                    <Text style={styles.checkboxLabel}>
                        By checking the box below, you agree to abide by our 
                        <Pressable onPress={termsConditionHandler}><Text style={styles.linkText}>Community Guidelines</Text></Pressable> and 
                        <Pressable onPress={termsConditionHandler}><Text style={styles.linkText}> Terms of Use.</Text></Pressable>
                    </Text>
                    <View style={styles.flatItem}>
                        {checked ? <Pressable onPress={() => setChecked(!checked)}><FastImage style={styles.icon} source={require('../../assets/images/icons/checked.png')} /></Pressable> : <Pressable onPress={() => setChecked(!checked)}><FastImage style={styles.icon} source={require('../../assets/images/icons/unchecked.png')} /></Pressable>}
                        <Text style={styles.checkboxLabel} onPress={() => setChecked(!checked)}>
                            I agree to the Community Guidelines and Terms of Use.
                        </Text>
                    </View>


                    <CustomButton
                        text={loader ? "Register..." : "Register"}
                        onPressHandler={ checked ? handleLogin : () => console.log('Ram...')}
                        textSize={20}
                        //isDisabled={(checked) ? true : false}                        
                        style={{backgroundColor:checked ? Colors.tabActiveColor : Colors.textInputDisabled}}
                    />

                    <View style={styles.footerTextWrapper}>
                        <Text style={styles.dontHaveAccount}>Already have an account?</Text>
                    </View>

                    <Pressable style={styles.registerBtnPressable} hitSlop={hitSlops()} onPress={goto.bind(null, 'Login')}>
                        <View style={styles.registerBtnWrapper}>
                            <Text style={[styles.dontHaveAccount, styles.login]}>Login</Text>
                        </View>
                    </Pressable>
                </ScrollView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    linkText: {
        textDecorationLine:'underline',
        color:Colors.blueColor
    },
    checkboxLabel: {
        marginLeft: 5,
        fontSize: Fonts.Size.Small,
        color: Colors.whiteColor,
    },
    icon: {
        width: 25,
        height: 25
    },
    flatItem: {                
        flexDirection: 'row',
        alignItems: 'center',        
        paddingVertical:10,
        //paddingLeft: 10,
        //backgroundColor:'red',
        width:'100%'
    },
    checkbox: {
        marginRight: 8,
      },
      label: {
        fontSize: 16,
      },
    keypad: {
        flex: 1
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: Colors.darkBackgroudColor
    },

    honest: {
        color: Colors.whiteColor,
        marginBottom: 40,
        fontFamily: Fonts.Family.Medium,
        fontSize: Fonts.Size.Small,
    },

    logo: {
        width: 150,
        height: 72,
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
        paddingRight: 10
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

    footerTextWrapper: {
        marginTop: 25,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center'
    },

    dontHaveAccount: {
        color: Colors.whiteColor,
        fontFamily: Fonts.Family.Medium,
        fontSize: Fonts.Size.Small,
        lineHeight: 20,
        textAlign: 'center'
    },
    login: {
        color: Colors.whiteColor,
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
    }
});

export default RegisterScreen;
