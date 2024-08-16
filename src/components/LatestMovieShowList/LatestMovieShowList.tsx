import React, { useLayoutEffect } from 'react';
import { View, StyleSheet, FlatList, RefreshControl, Dimensions, ActivityIndicator, Pressable } from 'react-native';
import Colors from '../../styles/Colors';
import { useNavigation, ParamListBase, NavigationProp } from '@react-navigation/native';
import { LastesMovieShowItem } from '../../types/LatestMovieShow';
import { fetchMovies } from '../../utils/Common';
import { useAuth } from '../../context/AuthContext';
import FastImage from 'react-native-fast-image';
import MovieImageMap from '../../utils/MovieImageMap';

interface LatestMovieShowListProps {

}

const screenWidth = Dimensions.get('window').width;

const LatestMovieShowList: React.FC<LatestMovieShowListProps> = () => {

    const { user } = useAuth();

    const navigation: NavigationProp<ParamListBase> = useNavigation();
    const [latestMovieShowList, setLatestMovieShowList] = React.useState<LastesMovieShowItem[]>([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const flatListRef = React.useRef<FlatList<any>>(null);
    const [loading, setLoading] = React.useState(true);

    useLayoutEffect(() => {

        const abortController = new AbortController();
        const signal = abortController.signal;

        const getLatestMovieShowList = async () => {
            if (user) {
                try {
                    const resp = await fetchMovies(user.token!, signal);
                    setTimeout(() => {
                        setLatestMovieShowList(resp.data.movies);
                        setLoading(false);
                    }, 2000);


                } catch (error) {
                    if (error instanceof Error) {
                        if (error.name === 'AbortError') {

                        } else {

                        }
                    } else {

                    }
                    throw error; // Re-throw the error to be handled by the caller if necessary
                }
            }
        };

        getLatestMovieShowList();



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

    const navigateToDetails = (latestMovieShowItem: LastesMovieShowItem) => {
        navigation.navigate('DetailScreen', { movie: latestMovieShowItem });
    };

    const renderItem = ({ item }: { item: LastesMovieShowItem }) => (
        <View style={[styles.item]}>
            <Pressable onPress={navigateToDetails.bind(null, item)} style={styles.pressable}>
                <FastImage
                    style={styles.image}
                    source={MovieImageMap[item.poster_url]}
                    resizeMode={FastImage.resizeMode.cover}
                />
            </Pressable>
        </View>
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
                data={latestMovieShowList}
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
                extraData={latestMovieShowList}
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
        overflow: 'hidden'
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

export default React.memo(LatestMovieShowList);
