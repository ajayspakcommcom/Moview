import React, { useLayoutEffect } from 'react';
import { View, StyleSheet, FlatList, RefreshControl, Dimensions, ActivityIndicator, Pressable } from 'react-native';
import Colors from '../../styles/Colors';
import { useNavigation, ParamListBase, NavigationProp } from '@react-navigation/native';
import { MovieItem } from '../../types/Movie';
import { fetchMovies } from '../../utils/Common';
import { useAuth } from '../../context/AuthContext';
import FastImage from 'react-native-fast-image';
import MovieImageMap from '../../utils/MovieImageMap';
import { Text } from 'react-native-paper';

interface MovieListProps {

}

const screenWidth = Dimensions.get('window').width;

const MovieList: React.FC<MovieListProps> = () => {

    const { user } = useAuth();

    const navigation: NavigationProp<ParamListBase> = useNavigation();
    const [movieList, setMovieList] = React.useState<MovieItem[]>([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const flatListRef = React.useRef<FlatList<any>>(null);
    const [loading, setLoading] = React.useState(true);

    useLayoutEffect(() => {

        const abortController = new AbortController();
        const signal = abortController.signal;

        const getMovieList = async () => {
            if (user) {
                try {
                    const resp = await fetchMovies(user.token!, signal);
                    setTimeout(() => {
                        setMovieList(resp.data.movies);
                        setLoading(false);
                    }, 2000);


                } catch (error) {
                    console.log(error);
                }
            }
        };

        getMovieList();

        return () => {
            abortController.abort(); // Cleanup on unmount
        };
    }, [user?.token]);

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };

    const navigateToDetails = (movieItem: MovieItem) => {
        navigation.navigate('DetailScreen', { movie: movieItem });
    };

    const renderItem = ({ item }: { item: MovieItem }) => (
        <>
            <View style={[styles.item]}>
                <Pressable onPress={navigateToDetails.bind(null, item)} style={styles.pressable}>
                    <FastImage style={styles.image} source={{uri: item.poster_url}} resizeMode={FastImage.resizeMode.cover} />                    
                </Pressable>
            </View>
        </>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.tabActiveColor} />
            </View>
        );
    }

    return (
        <>
            <FlatList
                ref={flatListRef}
                data={movieList}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                horizontal={false}
                refreshControl={<RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={[Colors.blackColor, Colors.darkBackgroudColor, Colors.playPauseButtonColor]}
                    progressBackgroundColor={Colors.tabActiveColor}
                />}
                numColumns={2}
                extraData={movieList}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
        </>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        width: ((screenWidth) / 2),
        height: (screenWidth / 2) + 55,
        overflow: 'hidden', 
        position:'relative'
    },
    pressable: {
        flex: 1
    },
    image: {
        width: ((screenWidth - 6) / 2),
        height: (screenWidth / 2) + 55,
        alignSelf: 'center',
    },
    text: {
        color: Colors.whiteColor,
        fontSize: 50
    },
    separator: {
        height: 3
    }
});

export default React.memo(MovieList);
