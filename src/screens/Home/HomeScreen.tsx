import * as React from 'react';
import { View, StyleSheet, Text, Pressable, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import MovieList from '../../components/MovieList/MovieList';
import { setTransparentHeader } from '../../utils/navigationOptions';

type Props = {
    navigation: StackNavigationProp<any>;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {




    React.useLayoutEffect(() => {

        setTransparentHeader(navigation, '', 'notifications');

        return () => {

        };
    }, []);


    const handlePress = () => {
        console.log('Ram...');
        Alert.alert('Button pressed', 'Ram...');
    };


    return (
        <>
            <View style={styles.container}>
                <View style={styles.movieList}>
                    <MovieList />
                </View>
            </View>

            {/* <View style={styles.container}>
                <Pressable onPress={() => console.log('Ram...')}>
                    <Text style={styles.text}>Hello</Text>
                </Pressable>
            </View> */}


        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    movieList: {
        backgroundColor: 'grey',
    },
    text: {
        color: 'white',
        fontSize: 50
    }
});

export default HomeScreen;
