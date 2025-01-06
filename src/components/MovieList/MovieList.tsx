import React, { useLayoutEffect } from 'react';
import { View, StyleSheet, FlatList, RefreshControl, Dimensions, ActivityIndicator, Pressable } from 'react-native';
import Colors from '../../styles/Colors';
import { useNavigation, ParamListBase, NavigationProp } from '@react-navigation/native';
import { MovieItem } from '../../types/Movie';
import { fetchMovies, getFirstThreeChars } from '../../utils/Common';
import { useAuth } from '../../context/AuthContext';
import FastImage from 'react-native-fast-image';
import MovieImageMap from '../../utils/MovieImageMap';
import { Text } from 'react-native-paper';
import Fonts from '../../styles/Fonts';
import { LastesMovieShowItem } from '../../types/LatestMovieShow';

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

    const abortController = new AbortController();
    const signal = abortController.signal;

    const getMovieList = React.useCallback(async () => {
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
    }, [user, signal, fetchMovies, setMovieList, setLoading]);

    useLayoutEffect(() => {
        getMovieList();
        return () => {
            abortController.abort(); // Cleanup on unmount
        };
    }, [user?.token]);

    const onRefresh = () => {
        setRefreshing(true);
        getMovieList();
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };

    const navigateToDetails = (movieItem: MovieItem) => {        
        navigation.navigate('DetailScreen', { movie: movieItem });
    };

    const renderItem = ({ item }: { item: LastesMovieShowItem }) => (
        <>
            <View style={[styles.item]}>
                <Pressable onPress={navigateToDetails.bind(null, item)} style={styles.pressable}>
                    <FastImage style={styles.image} source={{uri: item.poster_url}} resizeMode={FastImage.resizeMode.cover} />                    
                </Pressable>

                <View style={styles.category}>
                  <View style={styles.languageWrapper}>
                      <Text style={[styles.catergoryText]}>{getFirstThreeChars(item.language)}</Text>
                  </View>
                </View>

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
                contentContainerStyle={{ flexGrow:1 }}
                ref={flatListRef}
                data={movieList}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                horizontal={false}
                refreshControl={<RefreshControl
                    title='Loading...'
                    tintColor={Colors.tabActiveColor}
                    titleColor={Colors.whiteColor}
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
    category: {
        position: 'absolute',
        left: 1,
        bottom: 0,
        display:'flex',
        flexDirection:'row', 
        paddingBottom:5,
        paddingLeft:5
    },
    languageWrapper: {
        backgroundColor: Colors.tagBgColor, 
        paddingVertical: 1,
        paddingHorizontal: 10,
        textAlign: 'center',
        verticalAlign:'top',
        borderRadius: 50,
        marginRight:5,
        fontFamily:Fonts.Family.Light,
        elevation:5, 
        borderWidth:1,
        borderColor:Colors.tagBorderColor, 
        paddingBottom:2
    },
    catergoryText: {
        color: Colors.whiteColor
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
