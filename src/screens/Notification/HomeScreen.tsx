import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../styles/Colors';
import { useRoute, useNavigationState } from '@react-navigation/native';


const MyNotification = React.lazy(() => import('../../components/MyNotification/HomeScreen'));
const Loading = React.lazy(() => import('../../components/Loading/Loading'));

type Props = {
    navigation: any;
};

const Notification: React.FC<Props> = ({ navigation }) => {

    const route = useRoute();
    const navigationState = useNavigationState(state => state);

    const backButtonHandler = () => {
        navigation.navigate('HomeScreen');
    };

    const loadHeaderContent = () => {
        navigation.setOptions({
            title: ``,
            headerLeft: () => {
                return <Icon name={'chevron-back'} size={30} color={Colors.whiteColor} onPress={backButtonHandler} />
            }
        });
    };

    React.useLayoutEffect(() => {

        const previousRoute = navigationState.routes[navigationState.index - 1];
        const previousRouteName = previousRoute?.name;

        console.log('previousRoute', previousRoute);
        console.log('previousRouteName', previousRouteName);

        loadHeaderContent();

        return () => {

        };
    }, []);


    return (
        <View style={styles.container}>
            <React.Suspense fallback={<Loading />}>
                <MyNotification />
            </React.Suspense>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        position: 'relative',
        flexDirection: 'row',
        marginBottom: 15,
        flexGrow: 1
    }

});

export default Notification;
