import * as React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useRoute, useNavigation, ParamListBase, NavigationProp, RouteProp } from '@react-navigation/native';


type Props = {

};

const DetailScreen: React.FC<Props> = () => {

    const navigation: NavigationProp<ParamListBase> = useNavigation();
    const route: RouteProp<{ params: { email: string, userId: string, userName: string } }> = useRoute();

    React.useLayoutEffect(() => {

        console.log(route.params);
        // console.log(route.params.email);
        // console.log(route.params.userId);
        // console.log(route.params.userName);

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
