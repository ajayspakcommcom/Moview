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
            backgroundColor: Colors.redColor,
            borderRadius: 1,
            justifyContent: 'center',
            alignItems: 'center',

        },
        text: {
            fontSize: 18,
            fontWeight: 'bold',
            color: Colors.whiteColor,
            fontFamily: Fonts.Family.Bold
        },
        rippleEffect: {
            //color: Colors.venetianRed,
        },
    });

    const androidRippleConfig: PressableAndroidRippleConfig = {
        //color: Colors.venetianRed,
    };

    return (
        <Pressable style={[styles.button, style]} android_ripple={androidRippleConfig} onPress={onPressHandler}>
            <Text style={[styles.text]}>{text}</Text>
        </Pressable>
    );
};

export default CustomButton;
