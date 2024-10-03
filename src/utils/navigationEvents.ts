import { NavigationProp } from '@react-navigation/native';


export const createTabListener = (navigation: NavigationProp<any>, targetScreen: string) => ({
    tabPress: (e: any) => {
        e.preventDefault();
        navigation.navigate(targetScreen);
    },
});