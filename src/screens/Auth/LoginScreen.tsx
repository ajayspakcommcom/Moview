import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Colors from '../../styles/Colors';
import CustomTextInput from '../../components/Ui/CustomTextInput';
import CustomButton from '../../components/Ui/CustomButton';

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log('Username:', username);
        console.log('Password:', password);
    };

    return (
        <View style={styles.container}>

            <Image
                source={require('../../assets/images/logo.png')} //Replace with your image path
                style={styles.logo}
            />

            <CustomTextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
            />

            <CustomTextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                secureTextEntry
            />

            <CustomButton
                text="Login"
                onPressHandler={handleLogin}
                textSize={20}
            />

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
        marginBottom: 20,
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
});

export default LoginScreen;
