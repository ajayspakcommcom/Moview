import * as React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native';
import { Text, TextInput, Button, Checkbox } from 'react-native-paper';


export default function Test1() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    termsAccepted: false
  });

  const [errors, setErrors] = React.useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
  });

  const handleSubmit = () => {    
    const newErrors = {
      name: !formData.name ? 'Name is required' : '',
      email: !formData.email ? 'Email is required' : '',
      mobile: !formData.mobile ? 'Mobile number is required' : '',
      password: !formData.password ? 'Password is required' : '',
    };

    setErrors(newErrors);

    if (Object.values(newErrors).every(error => !error) && formData.termsAccepted) {
      console.log('Form submitted:', formData);
      // Handle form submission here
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Registration Form</Text>
      
      <TextInput
        label="Name"
        value={formData.name}
        onChangeText={(text) => setFormData({ ...formData, name: text })}
        style={styles.input}
        error={!!errors.name}
      />
      {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

      <TextInput
        label="Email"
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
        keyboardType="email-address"
        style={styles.input}
        error={!!errors.email}
      />
      {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

      <TextInput
        label="Mobile"
        value={formData.mobile}
        onChangeText={(text) => setFormData({ ...formData, mobile: text })}
        keyboardType="phone-pad"
        style={styles.input}
        error={!!errors.mobile}
      />
      {errors.mobile ? <Text style={styles.errorText}>{errors.mobile}</Text> : null}

      <TextInput
        label="Password"
        value={formData.password}
        onChangeText={(text) => setFormData({ ...formData, password: text })}
        secureTextEntry
        style={styles.input}
        error={!!errors.password}
      />
      {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

      <View style={styles.checkboxContainer}>
        {Platform.OS === 'ios' ? (
          <TouchableOpacity onPress={() => setFormData({ ...formData, termsAccepted: !formData.termsAccepted })} >
            <View style={{
              width: 20,
              height: 20,
              borderWidth: 1,
              borderColor: '#000',
              backgroundColor: formData.termsAccepted ? '#000' : '#fff',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {formData.termsAccepted && (<Text style={{color: '#fff'}}>✓</Text>)}
            </View>
          </TouchableOpacity>
        ) : (
          <Checkbox
            status={formData.termsAccepted ? 'checked' : 'unchecked'} 
            onPress={() => setFormData({ ...formData, termsAccepted: !formData.termsAccepted })}
          />
        )}
        <Text>I accept the terms and conditions</Text>
        <TouchableOpacity 
          onPress={() => Alert.alert(
            'Terms & Conditions',
            'Please read our terms and conditions carefully...'
          )}
          style={{marginLeft: 8}}
        >
          <Text style={{color: 'blue', textDecorationLine: 'underline'}}>View</Text>
        </TouchableOpacity>
      </View>

      <Button 
        mode="contained" 
        onPress={handleSubmit}
        style={styles.button}
        disabled={!formData.termsAccepted}
      >
        Submit
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 8,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  button: {
    marginTop: 16,
    paddingVertical: 8,
  },
});
