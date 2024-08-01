import Colors from '../styles/Colors';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';


export const setTransparentHeader = (navigation: StackNavigationProp<any>, title: string = '', iconName: string = 'notifications') => {

    const gotoNotification = () => {
        navigation.navigate('Notification');
    };

    navigation.setOptions({
        title: title,
        headerStyle: { backgroundColor: Colors.transparentColor },
        headerTransparent: true,
        headerRight: () => (<Icon name={iconName} size={25} color={Colors.tabActiveColor} onPress={gotoNotification} />),
    });
};