import * as React from 'react';
import { View, StyleSheet } from 'react-native';

const MyNotification = React.lazy(() => import('../../components/MyNotification/HomeScreen'));
const Loading = React.lazy(() => import('../../components/Loading/Loading'));


type Props = {

};

const Notification: React.FC<Props> = () => {



    React.useLayoutEffect(() => {

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
        paddingHorizontal: 15,
        flexGrow: 1
    }

});

export default Notification;
