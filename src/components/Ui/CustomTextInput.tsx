import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';

interface CustomTextInputProps extends TextInputProps {

}

const CustomTextInput: React.FC<CustomTextInputProps> = (props) => {

    const { onChangeText, ...otherProps } = props;

    const handleTextChange = (text: string) => {
        if (onChangeText) {
            onChangeText(text);
        }
    };

    return (
        <TextInput {...props} style={[styles.input, props.style]} onChangeText={handleTextChange} />
    );
};

const styles = StyleSheet.create({
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: Colors.inputBackgroundColor,
        borderRadius: 1,
        paddingHorizontal: 10,
        marginBottom: 15,
        color: Colors.blackColor,
        backgroundColor: Colors.inputBackgroundColor,
        fontFamily: Fonts.Family.Medium
    },
});

export default React.memo(CustomTextInput);
