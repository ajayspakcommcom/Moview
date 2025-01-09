import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, PressableAndroidRippleConfig } from 'react-native';
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';


interface CustomButtonProps {
    text: string;
    onPressHandler?: () => void;
    textSize?: number;
    style?: any; //Adjust type as per your specific styles
    isDisabled?: boolean;
    textStyle?: any;
}

const CustomButton: React.FC<CustomButtonProps> = ({ text, onPressHandler, textSize = 18, style, isDisabled, textStyle }) => {

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
            fontFamily: Fonts.Family.Bold,
            color: Colors.blackColor,
            fontSize:Fonts.Size.Medium,
            fontWeight:'700'
        },
        rippleEffect: {
            opacity: 0.5
        },
    });

    const androidRippleConfig: PressableAndroidRippleConfig = {
        color: Colors.tabActiveOpacityColor
    };

    const pressHandler = () => {

        if (onPressHandler) {
            onPressHandler();
        }
    };

    return (
        <Pressable style={[styles.button, style]} android_ripple={androidRippleConfig} onPress={pressHandler} disabled={isDisabled}>
            <Text style={[styles.text, textStyle]}>{text}</Text>
        </Pressable>
    );
};

export default React.memo(CustomButton);
