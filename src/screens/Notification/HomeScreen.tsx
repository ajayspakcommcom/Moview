import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../styles/Colors';

const MyNotification = React.lazy(() => import('../../components/MyNotification/HomeScreen'));
const Loading = React.lazy(() => import('../../components/Loading/Loading'));

type Props = {
    navigation: any;
};

const Notification: React.FC<Props> = ({ navigation }) => {

    const backButtonHandler = () => {
        navigation.goBack();
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

        loadHeaderContent();

        return () => {

        };
    }, [navigation]);


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
