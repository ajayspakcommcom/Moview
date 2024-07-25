import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Alert, FlatList, RefreshControl, Image, Dimensions, TouchableOpacity, ImageSourcePropType } from 'react-native';
import Colors from '../../styles/Colors';
import Video, { VideoRef, OnLoadData } from 'react-native-video';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation, ParamListBase, NavigationProp } from '@react-navigation/native';
import { MovieItem } from '../../types/Movie';
import { MovieDataList } from '../../utils/Data';
import { fetchMovies } from '../../utils/Common';
import { useAuth } from '../../context/AuthContext';
import { getData } from '../../utils/Storage';

interface MovieListProps {

}


const movieList: MovieItem[] = [...MovieDataList];
const screenWidth = Dimensions.get('window').width;

const MovieList: React.FC<MovieListProps> = () => {

    const { user } = useAuth();

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
            <TouchableOpacity onPress={() => navigateToDetails(item.id)}>
                <Image source={item.image} style={styles.image} />
            </TouchableOpacity>
        </View>
    );

    useLayoutEffect(() => {

        const abortController = new AbortController();
        const signal = abortController.signal;

        const getMovieList = async () => {
            if (user) {
                try {
                    const resp = await fetchMovies(user.token!, signal);
                    console.log(resp.data.movies);
                    for (const item of resp.data.movies) {
                        console.log('=======================================');
                        console.log(item);
                        console.log('=======================================');
                    }
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


        return () => {
            abortController.abort(); // Cleanup on unmount
        };
    }, [user?.token]);


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
                    progressBackgroundColor={Colors.tabActiveColor}
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
