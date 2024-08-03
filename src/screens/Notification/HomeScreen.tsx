import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MovieItem } from '../../types/Movie';
import { AirbnbRating } from 'react-native-ratings';
import FastImage from 'react-native-fast-image';
import MyNotification from '../../components/MyNotification/HomeScreen';


type Props = {

};

const Notification: React.FC<Props> = () => {



    React.useLayoutEffect(() => {

        return () => {

        };
    }, []);


    return (
        <View style={styles.container}>
            <MyNotification />
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
