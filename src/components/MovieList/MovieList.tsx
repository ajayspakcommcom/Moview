import React, { useLayoutEffect } from 'react';
import { View, StyleSheet, Alert, FlatList, RefreshControl, Image, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import Colors from '../../styles/Colors';
import { useNavigation, ParamListBase, NavigationProp } from '@react-navigation/native';
import { MovieItem } from '../../types/Movie';
import { fetchMovies } from '../../utils/Common';
import { useAuth } from '../../context/AuthContext';
import FastImage from 'react-native-fast-image';

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
                    console.clear();

                    setTimeout(() => {
                        setMovieList(resp.data.movies);
                        setLoading(false);
                    }, 2000);


                } catch (error) {
                    if (error instanceof Error) {
                        if (error.name === 'AbortError') {
                            console.log('Fetch aborted');
                        } else {
                            console.error('Error fetching movies:', error);
                        }
                    } else {
                        console.error('Unknown error', error);
                    }
                    throw error; // Re-throw the error to be handled by the caller if necessary
                }
            }
        };

        getMovieList();

        console.log((screenWidth / 2) + 60)

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
        <View style={[styles.item]}>
            <TouchableOpacity onPress={() => navigateToDetails(item)}>
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

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
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
        </>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
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

export default React.memo(MovieList);
