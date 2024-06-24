import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, GestureResponderEvent } from 'react-native';
import Colors from '../../styles/Colors';
import CustomTextInput from '../../components/Ui/CustomTextInput';
import CustomButton from '../../components/Ui/CustomButton';
import { Checkbox } from 'react-native-paper';
import Fonts from '../../styles/Fonts';
import { StackNavigationProp } from '@react-navigation/stack';

type Props = {
    navigation: StackNavigationProp<any>;
};

const RegisterScreen: React.FC<Props> = ({ navigation }) => {

    const [firstname, setFirstname] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [phone, setPhone] = React.useState('');

    const [checked, setChecked] = React.useState(false);

    const handleLogin = () => {
        console.log('Username:', username);
        console.log('Password:', password);
    };

    const handleFirstnameChange = (text: string) => {
        setFirstname(text);
    };

    const handleUsernameChange = (text: string) => {
        setUsername(text);
    };

    const handlePasswordChange = (text: string) => {
        setPassword(text);
    };

    const skipHandler = (event: GestureResponderEvent) => {
        console.log('Skip pressed!');
    };

    const goto = (screen: string) => {
        navigation.navigate(screen);
    };

    return (
        <View style={styles.container}>

            <Image
                source={require('../../assets/images/logo.png')} //Replace with your image path
                style={styles.logo}
            />

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
                placeholder="Password"
                value={password}
                onChangeText={handlePasswordChange}
                secureTextEntry
            />

            <CustomTextInput
                placeholder="Password"
                value={password}
                onChangeText={handlePasswordChange}
                secureTextEntry
            />

            <CustomButton
                text="Register"
                onPressHandler={handleLogin}
                textSize={20}
            />



            <View style={styles.footerTextWrapper}>
                <Text style={styles.dontHaveAccount}>Already have an account?</Text>
                <Text style={[styles.dontHaveAccount, styles.login]} onPress={() => goto('Login')}>Login</Text>
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
    }
});

export default RegisterScreen;
