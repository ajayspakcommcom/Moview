/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @format
 **/
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './src/screens/Auth/LoginScreen';
import RegisterScreen from './src/screens/Auth/RegisterScreen';
import Colors from './src/styles/Colors';
import HomeNavigation from './src/navigation/HomeNavigation';
import SearchNavigation from './src/navigation/SearchNavigation';
import SettingNavigation from './src/navigation/SettingNavigation';
import ProfileNavigation from './src/navigation/ProfileNavigation';
import TabNavigationOptions from './src/components/Utility/TabNavigationOptions';
import { useAuth } from './src/context/AuthContext';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function App(): React.JSX.Element {

  const { user } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);


  const stackScreenOptions = {
    headerShown: false,
    contentStyle: { backgroundColor: Colors.darkBackgroudColor }
  };


  React.useLayoutEffect(() => {

    const getUserData = async () => {
      const storedToken = await AsyncStorage.getItem('userToken');
      if (storedToken) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    getUserData();

  }, [user]);

  const tabScreenOptions: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarActiveTintColor: Colors.tabActiveColor,
    tabBarInactiveTintColor: Colors.whiteColor,
    tabBarStyle: { backgroundColor: Colors.tabBgColor, paddingHorizontal: 5, height: 60, paddingBottom: 5 },
    tabBarLabelStyle: { fontSize: 13, lineHeight: 15 },
  };


  return (

    <NavigationContainer>

      {!isLoggedIn &&
        <Stack.Navigator initialRouteName="Login" screenOptions={{ ...stackScreenOptions }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      }

      {isLoggedIn &&
        <Tab.Navigator screenOptions={{ ...tabScreenOptions }}>
          <Tab.Screen name="Home" component={HomeNavigation} options={TabNavigationOptions.Home} />
          <Tab.Screen name="Search" component={SearchNavigation} options={TabNavigationOptions.Search} />
          <Tab.Screen name="Setting" component={SettingNavigation} options={TabNavigationOptions.Setting} />
          <Tab.Screen name="Profile" component={ProfileNavigation} options={TabNavigationOptions.Profile} />
        </Tab.Navigator>
      }

    </NavigationContainer>
  );
}

export default App;
