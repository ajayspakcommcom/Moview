import * as React from 'react';
import { View, Text, StyleSheet, Alert, Pressable } from 'react-native';
import Colors from '../../styles/Colors';
import { Checkbox } from 'react-native-paper';
import Fonts from '../../styles/Fonts';
import { useAuth } from '../../context/AuthContext';
import { useNavigation, ParamListBase, NavigationProp } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import CustomTextInput from '../../components/Ui/CustomTextInput';
import CustomButton from '../../components/Ui/CustomButton';
import { hitSlops } from '../../utils/Common';

type Props = {

};

const LoginScreen: React.FC<Props> = () => {

    const { login, responseError } = useAuth();
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [checked, setChecked] = React.useState(false);
    const [loader, setLoader] = React.useState(false);

    const navigation: NavigationProp<ParamListBase> = useNavigation();

    const handleUsernameChange = (text: string) => {
        setUsername(text);
    };

    const handlePasswordChange = (text: string) => {
        setPassword(text);
    };

    const handleLogin = async () => {
        setLoader(true);
        try {
            if (username.trim() === '' || password.trim() === '') {
                Alert.alert('Error', 'Username or password cannot be empty');
                return;
            }
            await login(username, password);
            setLoader(false);
        } catch (error) {
            console.error('Login error:', error);
            Alert.alert('Error', 'Login failed. Please try again.');
        }
    };


    const goto = (screen: string) => {
        navigation.navigate(screen);
    };

    React.useLayoutEffect(() => {

        return () => {

        };
    }, [])

    return (
        <View style={styles.container}>

            <FastImage
                style={styles.logo}
                source={require('../../assets/images/logo.png')}
                resizeMode={FastImage.resizeMode.contain}
            />

            {
                responseError &&
                <View style={styles.errorWrapper}>
                    <Text style={styles.errorText}>{responseError.message}</Text>
                </View>
            }


            <CustomTextInput
                placeholder="Username"
                value={username}
                onChangeText={handleUsernameChange}
                autoCapitalize="none"
            />

            <CustomTextInput
                placeholder="Password"
                value={password}
                onChangeText={handlePasswordChange}
                secureTextEntry
            />

            <CustomButton
                text={loader ? 'Login...' : 'Login'}
                onPressHandler={handleLogin}
                textSize={20}
                isDisabled={loader ? true : false}
            />

            <View style={styles.rememberForgot}>
                <View style={styles.rememberCheckbox}>
                    <Checkbox
                        status={checked ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setChecked(!checked);
                        }}
                    />
                    <Text style={styles.remember}>Remember Me</Text>
                </View>
                <View>
                    <Text style={styles.forgotText}>Forgot Password</Text>
                </View>
            </View>


            <View style={styles.skipWrapper}>
                <Text style={styles.skipText} onPress={goto.bind(null, 'Home')}>SKIP</Text>
                <View style={styles.skipDont}>
                    <Text style={styles.skipBottomText}>Don’t have an account?</Text>
                </View>
            </View>

            <Pressable onPress={goto.bind(null, 'Register')} style={styles.registerBtnPressable} hitSlop={hitSlops()}>
                <View style={styles.registerBtnWrapper}>
                    <Text style={styles.skipBottomText}>Register</Text>
                </View>
            </Pressable>


        </View>
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
    logo: {
        width: 150,
        height: 72,
        marginBottom: 40,
    },

    errorWrapper: {
        paddingBottom: 15
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
    }
});

export default LoginScreen;
