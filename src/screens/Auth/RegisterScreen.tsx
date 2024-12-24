import * as React from 'react';
import { View, Text, StyleSheet, GestureResponderEvent, Alert, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import Colors from '../../styles/Colors';
import { Checkbox } from 'react-native-paper';
import Fonts from '../../styles/Fonts';
import { StackNavigationProp } from '@react-navigation/stack';
import { API_URL } from '../../configure/config.android';
import FastImage from 'react-native-fast-image';
import { hitSlops } from '../../utils/Common';
const CustomTextInput = React.lazy(() => import('../../components/Ui/CustomTextInput'));
const CustomButton = React.lazy(() => import('../../components/Ui/CustomButton'));

type Props = {
    navigation: StackNavigationProp<any>;
};

const RegisterScreen: React.FC<Props> = ({ navigation }) => {

    const [firstname, setFirstname] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [loader, setLoader] = React.useState(false);

    const handleLogin = async () => {

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
                            "password": password
                        }),
                    });

                    const result = await response.json();


                    if (result.status === 'success') {
                        setLoader(false);
                        Alert.alert('Registration Successfully', 'Thank you for your registration. We will contact you soon.', [{text: 'OK', onPress: () => navigation.navigate('Login')}]);
                    } else {
                        Alert.alert('Error', `${result.message}`, [
                            { text: 'OK', onPress: () => setLoader(false)}
                        ]);
                    }

                } catch (error) {

                }
            }

        } catch (error) {
            console.error('Login error:', error);
            Alert.alert('Error', 'Login failed. Please try again.');
        }

    };

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

    const skipHandler = (event: GestureResponderEvent) => {

    };

    const goto = (screen: string) => {
        navigation.navigate(screen);
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <View style={styles.container}>
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

            <CustomButton
                text={loader ? "Register..." : "Register"}
                onPressHandler={handleLogin}
                textSize={20}
                isDisabled={loader ? true : false}
            />

            <View style={styles.footerTextWrapper}>
                <Text style={styles.dontHaveAccount}>Already have an account?</Text>

            </View>

            <Pressable style={styles.registerBtnPressable} hitSlop={hitSlops()} onPress={goto.bind(null, 'Login')}>
                <View style={styles.registerBtnWrapper}>
                    <Text style={[styles.dontHaveAccount, styles.login]}>Login</Text>
                </View>
            </Pressable>
        </View>
        </KeyboardAvoidingView> 
    );
};

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: Colors.darkBackgroudColor
    },

    honest: {
        color:Colors.whiteColor, 
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
