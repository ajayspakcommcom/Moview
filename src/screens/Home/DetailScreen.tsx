import * as React from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { useRoute, useNavigation, ParamListBase, NavigationProp, RouteProp } from '@react-navigation/native';

type Props = {

};


const DetailScreen: React.FC<Props> = ({ }) => {

    const navigation: NavigationProp<ParamListBase> = useNavigation();
    const route: RouteProp<{ params: { id: string } }> = useRoute();


    React.useLayoutEffect(() => {

        console.log(route.params.id);

        return console.log('');
    }, []);

    return (
        <View style={styles.container}>
            <Text style={{ color: 'red' }}>Detail</Text>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%'
    },
    movieList: {
        flex: 1,
        width: '100%',
        backgroundColor: 'grey',
    }
});


export default DetailScreen;
