import * as React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import Colors from '../../styles/Colors';
import { Searchbar } from 'react-native-paper';
import { MovieItem } from '../../types/Movie';
import { MovieDataList } from '../../utils/Data';
import FilteredMovieList from '../../components/MovieList/FilteredMovieList';

type Props = {
    navigation: StackNavigationProp<any>;
};

const movieList: MovieItem[] = [...MovieDataList];

const HomeScreen: React.FC<Props> = () => {

    const [searchQuery, setSearchQuery] = React.useState('');
    const [movies, setMovies] = React.useState(movieList);
    const [fiteredMovies, setFilteredMovies] = React.useState(movies);
    const [movieData, setMovieData] = React.useState<MovieItem[]>([]);


    const onChangeSearch = (query: string): void => {
        setSearchQuery(query);

        const filteredArray = searchQuery ? movies.filter((movie: MovieItem) => movie.title.toLowerCase().trim() === searchQuery.toLowerCase().trim()) : movies;
        setFilteredMovies(filteredArray);

    };

    const onClearHandler = () => {
        setFilteredMovies(movies);
    };

    React.useLayoutEffect(() => {
        setMovieData(movieList);
        return () => setMovieData([]);
    }, [movieData]);

    return (
        <View style={styles.container}>

            <View style={styles.searchWrapper}>
                <Searchbar placeholder="Search Movie" onChangeText={onChangeSearch} value={searchQuery} onClearIconPress={onClearHandler} />
            </View>

            <View style={styles.movieList}>
                {movieData.length >= 0 &&
                    <>
                        <Text>Hello World</Text>
                        <FilteredMovieList movies={fiteredMovies} />
                    </>
                }
                {movieData.length <= 0 && <View><Text style={styles.text}>Emypty List</Text></View>}
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15
    },
    searchWrapper: {
        flexGrow: 1,
        paddingVertical: 15
    },
    movieList: {
        flexGrow: 1
    },

    text: {
        color: Colors.whiteColor,
        textAlign: 'center',
        marginTop: '50%'
    }
});

export default HomeScreen;
