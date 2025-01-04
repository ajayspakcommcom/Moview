
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Test2 = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [address1, setAddress1] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const insets = useSafeAreaInsets();

  const headerHeight = useHeaderHeight();


  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
      
        style={styles.container}
        behavior={'padding'}        
        keyboardVerticalOffset={insets.top + headerHeight}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>React Native Form</Text>

          <Text>Name:</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
          />

          <Text>Email:</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
          />

          <Text>Address:</Text>
          <TextInput
            style={[styles.input, styles.addressInput]}
            value={address}
            onChangeText={setAddress}
            placeholder="Enter your address"
            multiline
            numberOfLines={4} 
          />

          <Text>Address:</Text>
          <TextInput
            style={[styles.input, styles.addressInput]}
            value={address1}
            onChangeText={setAddress1}
            placeholder="Enter your address"
            multiline
            numberOfLines={4}
          />

          <Button title="Submit" onPress={handleSubmit} />

          {submitted && (
            <View style={styles.result}>
              <Text>Form submitted!</Text>
              <Text>Name: {name}</Text>
              <Text>Email: {email}</Text>
              <Text>Address: {address}</Text>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 150,
    textAlign: 'center',
  },
  input: {
    height: 60,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
  addressInput: {
    minHeight: 100, 
    maxHeight: 150, 
    paddingTop: 8, 
    paddingBottom: 8, 
    textAlignVertical: 'top', 
  },
  result: {
    marginTop: 20,
    padding: 10,
    borderTopWidth: 1,
    borderColor: 'gray',
  },
});

export default Test2;
