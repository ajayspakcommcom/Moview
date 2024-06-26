import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, FlatList, RefreshControl, Image, Dimensions } from 'react-native';
import Colors from '../../styles/Colors';
import Video, { VideoRef, OnLoadData } from 'react-native-video';

interface MovieListProps {
}

Image.resolveAssetSource

type DataItem = {
    id: string;
    title: string;
    image: string;
};

const data: DataItem[] = [
    { id: '1', title: 'Item 1', image: require('../../assets/images/movies/1.png') },
    { id: '2', title: 'Item 2', image: require('../../assets/images/movies/2.png') },
    { id: '3', title: 'Item 3', image: require('../../assets/images/movies/3.png') },
    { id: '4', title: 'Item 4', image: require('../../assets/images/movies/4.png') },
    { id: '5', title: 'Item 5', image: require('../../assets/images/movies/5.png') },
    { id: '6', title: 'Item 6', image: require('../../assets/images/movies/6.png') },
    { id: '7', title: 'Item 7', image: require('../../assets/images/movies/7.png') },
    { id: '8', title: 'Item 8', image: require('../../assets/images/movies/8.png') },
    { id: '9', title: 'Item 9', image: require('../../assets/images/movies/9.png') },
    { id: '10', title: 'Item 10', image: require('../../assets/images/movies/10.png') },
];


const screenWidth = Dimensions.get('window').width;

const MovieList: React.FC<MovieListProps> = () => {

    const [refreshing, setRefreshing] = React.useState(false);
    const flatListRef = React.useRef<FlatList<any>>(null);
    const videoRef = React.useRef<VideoRef>(null);

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };

    const renderItem = ({ item }: { item: DataItem }) => (
        <View style={[styles.item]}>
            <Image source={item.image} style={styles.image} />
        </View>
    );

    useLayoutEffect(() => {
        return () => console.log('');
    }, []);


    return (
        <>
            <FlatList
                ref={flatListRef}
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.container}
                horizontal={false}
                refreshControl={<RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={['#ff0000', '#00ff00', '#0000ff']}
                    progressBackgroundColor="yellow"
                />}
                numColumns={2}
                extraData={data}
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
        backgroundColor: '#f9c2ff',

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
