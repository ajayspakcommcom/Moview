import * as React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useRoute, useNavigation, ParamListBase, NavigationProp, RouteProp } from '@react-navigation/native';


type Props = {

};

const DetailScreen: React.FC<Props> = () => {

    const navigation: NavigationProp<ParamListBase> = useNavigation();
    const route: RouteProp<{ params: { email: string, userId: string, userName: string } }> = useRoute();

    React.useLayoutEffect(() => {
        return console.log('');
    }, []);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.box}></View>
        </ScrollView>
    );
};


const styles = StyleSheet.create({

    container: {
        flex: 1
    },
    box: {
        backgroundColor: 'red',
        width: '100%',
        height: 500
    }

});


export default DetailScreen;
