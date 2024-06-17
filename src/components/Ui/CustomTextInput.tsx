// src/components/CommonTextInput.tsx

import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';
import Colors from '../../styles/Colors';

interface CustomTextInputProps extends TextInputProps {
    // Define any additional props you want to pass to TextInput
}

const CustomTextInput: React.FC<CustomTextInputProps> = (props) => {
    return (
        <TextInput {...props} style={[styles.input, props.style]} />
    );
};

const styles = StyleSheet.create({
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: Colors.whiteColor,
        borderRadius: 1,
        paddingHorizontal: 10,
        marginBottom: 15,
        color: Colors.blackColor,
        backgroundColor: Colors.whiteColor
    },
});

export default CustomTextInput;
