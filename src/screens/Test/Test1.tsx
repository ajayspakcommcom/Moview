import { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, TextInput, Button } from 'react-native';
import { Filter } from 'bad-words'
import Colors from '../../styles/Colors';



type Props = {

};

const Test1: React.FC<Props> = () => {

    const filter = new Filter();
    const [userInput, setUserInput] = useState('');
    const [isClean, setIsClean] = useState(true);

  

    const handleSubmit = () => {
        
        if (!userInput.trim()) {
            Alert.alert('Error', 'Please enter some text');
            return;
        }

        const containsProfanity = filter.isProfane(userInput);
        setIsClean(!containsProfanity);
        
        if (containsProfanity) {
            Alert.alert('Warning', 'Please keep it clean! Profanity detected.');
        } else {
            Alert.alert('Success', 'Text submitted successfully!');
            setUserInput('');             
        }
    };



    useEffect(() => {
        console.clear();
    }, []);

    return (
        <View style={styles.container}>
            <TextInput
                style={[
                    styles.input,
                    !isClean && styles.inputError
                ]}
                value={userInput}
                onChangeText={(text) => {
                    setUserInput(text);
                }}
                placeholder="Enter your text here"
                placeholderTextColor="#666"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                autoCapitalize="none"
                autoCorrect={true}
                maxLength={500}
            />

            <Button
                title="Submit"
                onPress={handleSubmit}
                color={Colors.tabActiveColor}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.darkBackgroudColor,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    scrollContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: 'red'
    },
    input: {
        backgroundColor: 'red',
        borderRadius: 8,
        padding: 12,
        color: Colors.blackColor,
        width: '100%',
        minHeight: 200,
    },
    inputError: {
        borderWidth: 1,
        borderColor: 'red',
    }
});

export default Test1;
