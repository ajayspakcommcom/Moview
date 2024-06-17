/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useColorScheme } from 'react-native';
import LoginScreen from './src/screens/Auth/LoginScreen';
import Colors from './src/styles/Colors';

const Stack = createStackNavigator();

function App(): React.JSX.Element {


  const stackScreenOptions = {
    headerShown: false,
    contentStyle: { backgroundColor: Colors.darkBackgroudColor }
  };


  return (

    <NavigationContainer>

      <Stack.Navigator initialRouteName="Login" screenOptions={{ ...stackScreenOptions }}>
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>

    </NavigationContainer>
  );
}

export default App;
