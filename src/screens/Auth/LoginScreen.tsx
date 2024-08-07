import * as React from 'react';
import { View, Text, StyleSheet, Platform, Alert } from 'react-native';
import Colors from '../../styles/Colors';
import CustomTextInput from '../../components/Ui/CustomTextInput';
import CustomButton from '../../components/Ui/CustomButton';
import { Checkbox } from 'react-native-paper';
import Fonts from '../../styles/Fonts';
import { useAuth } from '../../context/AuthContext';
import { useRoute, useNavigation, ParamListBase, NavigationProp, RouteProp } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';


type Props = {

};

const LoginScreen: React.FC<Props> = () => {

    const { user, login, responseError } = useAuth();

    const [username, setUsername] = React.useState('omkar@gmail.com');
    const [password, setPassword] = React.useState('12345');
    const [checked, setChecked] = React.useState(false);
    const [loader, setLoader] = React.useState(false);

    const navigation: NavigationProp<ParamListBase> = useNavigation();
    const route: RouteProp<{ params: { email: string, userId: string, userName: string } }> = useRoute();

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
                    <Text style={styles.skipBottomText} onPress={goto.bind(null, 'Register')}>Register</Text>
                </View>
            </View>

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
        width: 166,
        height: 118,
        marginBottom: 60,
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
    }
});

export default LoginScreen;
