import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  Platform,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


// Define props interface (optional if you have specific props)
interface LoadingProps {
    message?: string;
}

// Functional component with optional message prop
const Test6: React.FC<LoadingProps> = ({ message = 'Test6' }) => {

    const handleFormSubmit = () => {
        console.log('Form Submitted!');
      };

    return (
        <KeyboardAwareScrollView
              contentContainerStyle={styles.container}
              enableOnAndroid={true} // Works on both iOS and Android
              extraScrollHeight={20} // Ensures inputs are visible
              keyboardShouldPersistTaps="handled" // Dismiss keyboard on tapping outside
            >
              <Text style={styles.header}>iOS-Friendly Form</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your name"
              />
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                keyboardType="email-address"
              />
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Enter your feedback"
                multiline
                numberOfLines={4}
              />
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Enter your feedback"
                multiline
                numberOfLines={4}
              />
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Enter your feedback"
                multiline
                numberOfLines={4}
              />
              <Button title="Submit" onPress={handleFormSubmit} />
            </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      justifyContent: 'center',
      padding: 20,
    },
    header: {
      fontSize: 24,
      textAlign: 'center',
      marginBottom: 20,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 20,
      paddingHorizontal: 10,
      borderRadius: 5,
    },
    textArea: {
      height: 100,
      textAlignVertical: 'top', // For proper alignment in multiline TextInput
    },
  });

export default React.memo(Test6);
