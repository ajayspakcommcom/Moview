import * as React from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useRoute, useNavigation } from '@react-navigation/native';

type RootStackParamList = {
    HomeScreen: undefined;
    DetailScreen: { itemId: string };
};

type DetailScreenProps = StackScreenProps<RootStackParamList, 'DetailScreen'>;


const DetailScreen: React.FC<DetailScreenProps> = () => {

    const route = useRoute();
    const navigation = useNavigation();



    React.useLayoutEffect(() => {

        return console.log('')
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
