import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Alert, FlatList, RefreshControl, Image, Dimensions, TouchableOpacity, ImageSourcePropType } from 'react-native';
import Colors from '../../styles/Colors';
import Video, { VideoRef, OnLoadData } from 'react-native-video';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation, ParamListBase, NavigationProp } from '@react-navigation/native';
import { MovieItem } from '../../types/Movie';
import { MovieDataList } from '../../utils/Data';

interface MovieListProps {

}

// const data: MovieItem[] = [
//     { id: '1', title: 'Movie 1', image: require('../../assets/images/movies/1.jpg'), videoUrl: '' },
//     { id: '2', title: 'Movie 2', image: require('../../assets/images/movies/2.jpg'), videoUrl: '' },
//     { id: '3', title: 'Movie 3', image: require('../../assets/images/movies/3.jpg'), videoUrl: '' },
//     { id: '4', title: 'Movie 4', image: require('../../assets/images/movies/4.jpg'), videoUrl: '' },
//     { id: '5', title: 'Movie 5', image: require('../../assets/images/movies/5.jpg'), videoUrl: '' },
//     { id: '6', title: 'Movie 6', image: require('../../assets/images/movies/6.jpg'), videoUrl: '' },
//     { id: '7', title: 'Movie 7', image: require('../../assets/images/movies/7.jpg'), videoUrl: '' },
//     { id: '8', title: 'Movie 8', image: require('../../assets/images/movies/8.jpg'), videoUrl: '' },
//     { id: '9', title: 'Movie 9', image: require('../../assets/images/movies/9.jpg'), videoUrl: '' },
//     { id: '10', title: 'Movie 10', image: require('../../assets/images/movies/10.jpg'), videoUrl: '' },
//     { id: '11', title: 'Movie 11', image: require('../../assets/images/movies/11.jpg'), videoUrl: '' },
//     { id: '12', title: 'Movie 12', image: require('../../assets/images/movies/12.jpg'), videoUrl: '' },
//     { id: '13', title: 'Movie 13', image: require('../../assets/images/movies/13.jpg'), videoUrl: '' },
//     { id: '14', title: 'Movie 14', image: require('../../assets/images/movies/14.jpg'), videoUrl: '' },
//     { id: '15', title: 'Movie 15', image: require('../../assets/images/movies/15.jpg'), videoUrl: '' },
//     { id: '16', title: 'Movie 16', image: require('../../assets/images/movies/16.jpg'), videoUrl: '' },
//     { id: '17', title: 'Movie 17', image: require('../../assets/images/movies/17.jpg'), videoUrl: '' },
//     { id: '18', title: 'Movie 18', image: require('../../assets/images/movies/18.jpg'), videoUrl: '' },
//     { id: '19', title: 'Movie 19', image: require('../../assets/images/movies/19.jpg'), videoUrl: '' },
//     { id: '20', title: 'Movie 20', image: require('../../assets/images/movies/20.jpg'), videoUrl: '' },
//     { id: '21', title: 'Movie 21', image: require('../../assets/images/movies/21.jpg'), videoUrl: '' },
//     { id: '22', title: 'Movie 22', image: require('../../assets/images/movies/22.jpg'), videoUrl: '' },
//     { id: '23', title: 'Movie 23', image: require('../../assets/images/movies/23.jpg'), videoUrl: '' },
//     { id: '24', title: 'Movie 24', image: require('../../assets/images/movies/24.jpg'), videoUrl: '' },
// ];

const movieList: MovieItem[] = [...MovieDataList];


const screenWidth = Dimensions.get('window').width;

const MovieList: React.FC<MovieListProps> = () => {

    const navigation: NavigationProp<ParamListBase> = useNavigation();

    const [refreshing, setRefreshing] = React.useState(false);
    const flatListRef = React.useRef<FlatList<any>>(null);
    const videoRef = React.useRef<VideoRef>(null);

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };

    const navigateToDetails = (itemId: string) => {
        navigation.navigate('DetailScreen', { id: itemId });
    };

    const renderItem = ({ item }: { item: MovieItem }) => (
        <View style={[styles.item]}>
            <TouchableOpacity onPress={() => navigateToDetails(item.id)}>
                <Image source={item.image} style={styles.image} />
            </TouchableOpacity>
        </View>
    );

    useLayoutEffect(() => {
        return () => console.log('');
    }, []);


    return (
        <>
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
                    progressBackgroundColor="yellow"
                />}
                numColumns={2}
                extraData={movieList}
            />

        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    item: {
        width: (screenWidth / 2),
        height: (screenWidth / 2) + 60,
        position: 'relative',
    },
    image: {
        width: (screenWidth / 2),
        height: (screenWidth / 2) + 60,
        aspectRatio: 1,
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0
    }

});

export default MovieList;
