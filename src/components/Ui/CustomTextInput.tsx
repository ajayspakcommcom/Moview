import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';

interface CustomTextInputProps extends TextInputProps {

}

const CustomTextInput: React.FC<CustomTextInputProps> = (props) => {

    React.useLayoutEffect(() => {

        return () => {

        }
    }, []);

    const { onChangeText, ...otherProps } = props;

    const handleTextChange = (text: string) => {
        if (onChangeText) {
            onChangeText(text);
        }
    };

    return (
        <TextInput {...props} placeholderTextColor={Colors.blackColor} style={[styles.input, props.editable === false && styles.disabled, props.style]} onChangeText={handleTextChange} />
    );
};

const styles = StyleSheet.create({
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: Colors.inputBackgroundColor,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 15,
        color: Colors.blackColor,
        backgroundColor: Colors.inputBackgroundColor,
        fontFamily: Fonts.Family.Medium
    },
    disabled: {
        backgroundColor: Colors.textInputDisabled,
        borderColor: Colors.textInputDisabled,
        borderWidth: 1,
    }
});

export default React.memo(CustomTextInput);
