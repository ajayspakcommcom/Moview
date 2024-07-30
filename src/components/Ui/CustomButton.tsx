import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, PressableAndroidRippleConfig } from 'react-native';
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';


interface CustomButtonProps {
    text: string;
    onPressHandler: () => void;
    textSize?: number;
    style?: any; //Adjust type as per your specific styles
}

const CustomButton: React.FC<CustomButtonProps> = ({ text, onPressHandler, textSize = 18, style }) => {

    const styles = StyleSheet.create({
        button: {
            display: 'flex',
            paddingVertical: 10,
            width: '100%',
            height: 50,
            backgroundColor: Colors.tabActiveColor,
            borderRadius: 1,
            justifyContent: 'center',
            alignItems: 'center',

        },
        text: {
            fontSize: Fonts.Size.Medium - 1,
            color: Colors.blackColor,
            fontFamily: Fonts.Family.Bold
        },
        rippleEffect: {
            opacity: 0.5
        },
    });

    const androidRippleConfig: PressableAndroidRippleConfig = {
        color: Colors.tabActiveOpacityColor
    };

    return (
        <Pressable style={[styles.button, style]} android_ripple={androidRippleConfig} onPress={onPressHandler}>
            <Text style={[styles.text]}>{text}</Text>
        </Pressable>
    );
};

export default React.memo(CustomButton);
