import * as React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, FlatList, Image, RefreshControl, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import Colors from '../../styles/Colors';
import { useRoute, useNavigation, ParamListBase, NavigationProp, RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { MovieItem } from '../../types/Movie';
import { MovieDataList } from '../../utils/Data';

type Props = {
    navigation: StackNavigationProp<any>;
};

const movieList: MovieItem[] = [...MovieDataList];

const Notification: React.FC<Props> = () => {

    const navigation: NavigationProp<ParamListBase> = useNavigation();
    const route: RouteProp<{ params: { id: string, queryParams: any } }> = useRoute();

    const flatListRef = React.useRef<FlatList<any>>(null);
    const [refreshing, setRefreshing] = React.useState(false);

    React.useLayoutEffect(() => {

        const backButtonHandler = () => {
            navigation.navigate('Profile', { screen: 'HomeScreen' });
        };

        const gotoNotification = () => {
            console.log('Notification...');
        };

        navigation.setOptions({
            title: `Notifcation`,
            headerLeft: () => {
                return <Icon name={'chevron-back'} size={30} color={Colors.whiteColor} onPress={backButtonHandler} />
            },
            headerRight: () => {
                return <Icon name={'notifications'} size={25} color={Colors.tabActiveColor} onPress={gotoNotification} />
            }
        });

        return console.log('');
    }, []);

    const onRefresh = () => {
        setTimeout(() => {
            console.log('......');
        }, 2000);
    };

    const navigateToDetails = (itemId: string) => {
        //navigation.navigate('DetailScreen', { id: itemId });
    };

    const renderItem = ({ item }: { item: MovieItem }) => (
        <View style={[styles.item]}>
            <TouchableOpacity onPress={() => navigateToDetails(item.id)}>
                <Image source={item.image} style={styles.image} />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={movieList}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.container}
                horizontal={false}
                refreshControl={<RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={[Colors.blackColor, Colors.darkBackgroudColor, Colors.playPauseButtonColor]}
                    progressBackgroundColor={Colors.tabActiveColor}
                />}
                numColumns={2}
                extraData={movieList}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        width: 200,
        height: 300,
        position: 'relative',
    },
    image: {
        width: 200,
        height: 300,
        aspectRatio: 1,
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0
    },

    text: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: Colors.whiteColor
    }
});

export default Notification;
