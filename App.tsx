
import * as React from 'react';
import { Keyboard, Platform, View, StyleSheet, StatusBar, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from './src/styles/Colors';
import { useAuth } from './src/context/AuthContext';
import SplashScreen from 'react-native-splash-screen';
import Orientation from 'react-native-orientation-locker';
import TabNavigationOptions from './src/components/Utility/TabNavigationOptions';
import LoginScreen from './src/screens/Auth/LoginScreen';
import RegisterScreen from './src/screens/Auth/RegisterScreen';
import MyReviewNavigation from './src/navigation/MyReviewNavigation';
import HomeNavigation from './src/navigation/HomeNavigation';
import SearchNavigation from './src/navigation/SearchNavigation';
import ProfileNavigation from './src/navigation/ProfileNavigation';
import Test1 from './src/screens/Test/Test1';
import Test2 from './src/screens/Test/Test2';
import { BlurView } from '@react-native-community/blur';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function App(): React.JSX.Element {

  const { user } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [keyboardVisible, setKeyboardVisible] = React.useState(false);

  React.useLayoutEffect(() => {
    SplashScreen.hide();
    Orientation.lockToPortrait();
  }, []);


  const stackScreenOptions = {
    headerShown: false,
    contentStyle: { backgroundColor: Colors.darkBackgroudColor }
  };


  React.useLayoutEffect(() => {

    const getUserData = async () => {

      if (user?.token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }

    };
    getUserData();

    const keyboardDidShowListener = Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow', () => setKeyboardVisible(true));
    const keyboardDidHideListener = Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide', () => setKeyboardVisible(false));

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    }

  }, [user]);

  const tabScreenOptions: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarActiveTintColor: Colors.tabActiveColor,
    tabBarInactiveTintColor: Colors.whiteColor,
    tabBarStyle: {
      backgroundColor: 'rgba(0, 0, 0, 0.80)',
      position: 'absolute',
      borderTopWidth: 0,
      elevation: 0,
      shadowOpacity: 0,
    },
    tabBarLabelStyle: { fontSize: 10, lineHeight: 0, height: 0 }
  };


  return (

    <View style={styles.appContainer}>

      {Platform.OS === 'ios' && <View style={styles.statusBar}></View>}

      <NavigationContainer>

        {!isLoggedIn &&
          <Stack.Navigator initialRouteName="Login" screenOptions={{ ...stackScreenOptions }}>
            <Stack.Screen name="Login" component={LoginScreen} options={{ animationEnabled: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ animationEnabled: false }} />
          </Stack.Navigator>
        }

        {isLoggedIn &&
          <Tab.Navigator screenOptions={{ ...tabScreenOptions }}>
            <Tab.Screen
              name="Home"
              component={HomeNavigation}
              options={{ ...TabNavigationOptions.Home }}
              listeners={({ navigation }) => ({
                tabPress: (e) => navigation.navigate('Home', { screen: 'HomeScreen' })
              })}
            />

            <Stack.Screen name="Test1" component={Test1} options={{ animationEnabled: false }} />
            <Tab.Screen name="Search" component={SearchNavigation} options={TabNavigationOptions.Search} />

            <Tab.Screen
              name="MyReview"
              component={MyReviewNavigation}
              options={{ ...TabNavigationOptions.MyReview }}
              listeners={({ navigation }) => ({
                tabPress: (e) => {
                  navigation.navigate('MyReview', { screen: 'HomeScreen' });
                }
              })}
            />

            <Tab.Screen
              name="Profile"
              component={ProfileNavigation}
              options={{ ...TabNavigationOptions.Profile }}
              listeners={({ navigation }) => ({
                tabPress: (e) => {
                  navigation.navigate('Profile', { screen: 'HomeScreen' });
                }
              })}
            />

          </Tab.Navigator>
        }

      </NavigationContainer >
    </View>

  );
}

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: Colors.blackColor,
    height: 60
  },
  appContainer: {
    flex: 1,
  }
});

export default App;
