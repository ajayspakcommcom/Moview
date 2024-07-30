import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import ReviewList from '../../components/ReviewList/ReviewList';
import { useAuth } from '../../context/AuthContext';

type Props = {

};

const HomeScreen: React.FC<Props> = () => {

    const { userDetail } = useAuth();

    React.useLayoutEffect(() => {



        return console.log('');
    }, []);


    return (
        <>
            <View style={styles.container}>
                <ReviewList userItem={userDetail} />
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
