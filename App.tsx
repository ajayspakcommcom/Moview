/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @format
 **/
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { useColorScheme } from 'react-native';
import LoginScreen from './src/screens/Auth/LoginScreen';
import RegisterScreen from './src/screens/Auth/RegisterScreen';
import Colors from './src/styles/Colors';
import { Provider as PaperProvider } from 'react-native-paper';
import HomeNavigation from './src/navigation/HomeNavigation';
import Icon from 'react-native-vector-icons/Ionicons';
import SearchNavigation from './src/navigation/SearchNavigation';
import SettingNavigation from './src/navigation/SettingNavigation';
import ProfileNavigation from './src/navigation/ProfileNavigation';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function App(): React.JSX.Element {

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);


  const stackScreenOptions = {
    headerShown: false,
    contentStyle: { backgroundColor: Colors.darkBackgroudColor }
  };


  React.useEffect(() => {
    setIsLoggedIn(true);
    console.clear();
    console.log('Ram...');
  }, []);


  return (



    <NavigationContainer>

      {!isLoggedIn &&
        <Stack.Navigator initialRouteName="Login" screenOptions={{ ...stackScreenOptions }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      }


      {isLoggedIn &&
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeNavigation} options={{ tabBarIcon: ({ color, size }) => <Icon name={'home'} size={size} color={color} /> }} />
          <Tab.Screen name="Search" component={SearchNavigation} options={{ tabBarIcon: ({ color, size }) => <Icon name={'search'} size={size} color={color} /> }} />
          <Tab.Screen name="Setting" component={SettingNavigation} options={{ tabBarIcon: ({ color, size }) => <Icon name={'settings'} size={size} color={color} /> }} />
          <Tab.Screen name="Profile" component={ProfileNavigation} options={{ tabBarIcon: ({ color, size }) => <Icon name={'person-circle-outline'} size={size} color={color} /> }} />


        </Tab.Navigator>
      }


    </NavigationContainer>
  );
}

export default App;
