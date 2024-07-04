import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import ReviewList from '../../components/ReviewList/ReviewList';

type Props = {

};

const HomeScreen: React.FC<Props> = () => {

    React.useLayoutEffect(() => {
        return console.log('');
    }, []);


    return (
        <>
            <View style={styles.container}>
                <ReviewList />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 15
    }
});

export default HomeScreen;
