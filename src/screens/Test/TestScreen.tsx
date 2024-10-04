import React from 'react';
import { View, StyleSheet, Keyboard } from 'react-native';
import { TextInput } from 'react-native-paper';
import Colors from '../../styles/Colors';

const TestScreen = () => {

    const [showPassword, setShowPassword] = React.useState(false);

    const togglePassword = () => {
        setShowPassword(!showPassword);
        Keyboard.dismiss();
    }
    
    return (        
            <View style={[styles.Wrapper]}>                
                <TextInput label="Password" style={styles.input}  secureTextEntry={!showPassword} right={<TextInput.Icon icon="eye" onPress={togglePassword}  />} />
            </View>        
    );
};

const styles = StyleSheet.create({   
    Wrapper: {
        flex: 1,  
        backgroundColor: 'red', 
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {        
        margin: 10,
        paddingHorizontal: 20
    },
    whiteText: {
        color: Colors.whiteColor
    }    
});

export default TestScreen;
