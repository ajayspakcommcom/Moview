import * as React from 'react';
import { View, StyleSheet, } from 'react-native';
import { Text } from 'react-native-paper';


type Props = {
    navigation: any;
    route: any;
};

const Following: React.FC<Props> = ({ navigation, route }) => {


    React.useLayoutEffect(() => {

        return () => {

        }
    }, []);



    return (
        <>
            <Text style={{ color: '#fff' }}>Following</Text>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

});

export default React.memo(Following);
