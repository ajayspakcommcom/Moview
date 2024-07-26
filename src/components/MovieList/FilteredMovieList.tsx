import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Alert, FlatList, RefreshControl, Image, Dimensions, TouchableOpacity, ImageSourcePropType } from 'react-native';
import Colors from '../../styles/Colors';
import Video, { VideoRef, OnLoadData } from 'react-native-video';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation, ParamListBase, NavigationProp } from '@react-navigation/native';
import { MovieItem } from '../../types/Movie';
import { MovieDataList } from '../../utils/Data';
import FastImage from 'react-native-fast-image';

interface MovieListProps {
    movies: MovieItem[]
}



const screenWidth = Dimensions.get('window').width;

const FilteredMovieList: React.FC<MovieListProps> = ({ movies }) => {

    const navigation: NavigationProp<ParamListBase> = useNavigation();

    const [refreshing, setRefreshing] = React.useState(false);
    const flatListRef = React.useRef<FlatList<any>>(null);

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
            <TouchableOpacity onPress={() => navigateToDetails(item._id)}>
                <FastImage
                    style={styles.image}
                    source={{
                        uri: item.poster_url,
                        priority: FastImage.priority.high,
                        cache: FastImage.cacheControl.immutable
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                />
            </TouchableOpacity>
        </View>
    );

    useLayoutEffect(() => {
        return () => console.log('');
    }, [movies]);


    return (
        <>
            <FlatList
                ref={flatListRef}
                data={movies}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                contentContainerStyle={styles.container}
                horizontal={false}
                refreshControl={<RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={[Colors.blackColor, Colors.darkBackgroudColor, Colors.playPauseButtonColor]}
                    progressBackgroundColor={Colors.tabActiveColor}
                />}
                numColumns={2}
                extraData={movies}
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

export default React.memo(FilteredMovieList);
