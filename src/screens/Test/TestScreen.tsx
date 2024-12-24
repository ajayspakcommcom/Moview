import React, { useState, useEffect, useCallback } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Platform,
} from 'react-native';


const TestScreen = () => {

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior={'padding'} style={styles.container} >
          <ScrollView contentContainerStyle={styles.contentContainer} keyboardShouldPersistTaps="handled">
            <Text style={styles.header}>Write a Review</Text>
            <TextInput
              style={styles.input}
              placeholder="Your Name"
            />
            <TextInput
              style={styles.input}
              placeholder="Your Review"
              multiline
            />
            <Text style={styles.footer}>Thank you for your feedback!</Text>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  footer: {
    marginTop: 20,
    textAlign: 'center',
  },
});

export default TestScreen;
