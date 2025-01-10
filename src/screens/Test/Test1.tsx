import { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, TextInput, Button, Text, ActionSheetIOS } from 'react-native';
import { GestureHandlerRootView, LongPressGestureHandler, TapGestureHandler } from 'react-native-gesture-handler';
import ReportMovieModal from '../../components/ReportModal/ReportMovieModal';




type Props = {

};

const Test1: React.FC<Props> = () => {

    const [pressed, setPressed] = useState(false);

    const onLongPress = () => {
        setPressed(true);       
    };

    const handleCloseModal = () => {
        setPressed(false);
    };

   

    return (
        <GestureHandlerRootView style={styles.container}>
            <LongPressGestureHandler onActivated={onLongPress} minDurationMs={500}>
                <View style={[styles.button]}>
                    <Text style={styles.buttonText}>Long Press Me</Text>
                </View>
            </LongPressGestureHandler>

          

        </GestureHandlerRootView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        padding: 20,
        backgroundColor: 'lightblue',
        borderRadius: 10,
    },
    buttonPressed: {
        backgroundColor: 'lightcoral',
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
    }
});

export default Test1;
