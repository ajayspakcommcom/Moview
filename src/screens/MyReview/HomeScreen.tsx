import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {

};

const HomeScreen: React.FC<Props> = () => {

    React.useLayoutEffect(() => {
        return console.log('');
    }, []);


    return (
        <>
            <View style={styles.container}></View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red'
    }
});

export default HomeScreen;
