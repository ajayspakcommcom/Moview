import * as React from 'react';
import { View, Text, StyleSheet, Button, ScrollView, ImageSourcePropType } from 'react-native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { useRoute, useNavigation, ParamListBase, NavigationProp, RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../styles/Colors';
import { MovieItem } from '../../types/Movie';
import { findMovieById } from '../../utils/Common';
import { MovieDataList } from '../../utils/Data';

type Props = {

};

const movieList: MovieItem[] = [...MovieDataList];

const DetailScreen: React.FC<Props> = ({ }) => {

    const navigation: NavigationProp<ParamListBase> = useNavigation();
    const route: RouteProp<{ params: { id: string } }> = useRoute();


    React.useLayoutEffect(() => {

        const movie = findMovieById(movieList, route.params.id);

        const backButtonHandler = () => {
            navigation.navigate('HomeScreen');
        };

        const gotoNotification = () => {
            console.log('Notification...');
        };

        navigation.setOptions({
            title: `${movie?.title}`,
            headerLeft: () => {
                return <Icon name={'chevron-back'} size={30} color={Colors.whiteColor} onPress={backButtonHandler} />
            },
            headerRight: () => {
                return <Icon name={'notifications'} size={25} color={Colors.tabActiveColor} onPress={gotoNotification} />
            }
        });

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
        flex: 1,
        backgroundColor: 'pink'
    },
    box: {
        width: '100%',
        height: 500,
        backgroundColor: 'red',
        borderWidth: 1,
        borderColor: 'yellow'
    }
});


export default DetailScreen;
