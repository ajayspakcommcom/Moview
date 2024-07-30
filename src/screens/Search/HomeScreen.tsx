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

const HomeScreen: React.FC<Props> = () => {

    const [searchQuery, setSearchQuery] = React.useState<string>('');
    const [filteredMovies, setFilteredMovies] = React.useState<MovieItem[]>(MovieDataList);

    const onChangeSearch = (query: string) => {
        setSearchQuery(query);
        setFilteredMovies(MovieDataList.filter(movie => movie.title.toLowerCase().includes(query.toLowerCase())));
    };

    const onClearHandler = () => {
        setFilteredMovies(MovieDataList);
    };


    React.useLayoutEffect(() => {



        return () => {

        };

    }, []);

    return (
        <View style={styles.container}>

            <View style={styles.searchWrapper}>
                <Searchbar placeholder="Search Movie" onChangeText={onChangeSearch} value={searchQuery} onClearIconPress={onClearHandler} />
            </View>

            <View style={styles.movieList}>
                <Text style={{ color: '#fff' }}>{searchQuery}</Text>
                {filteredMovies.length >= 0 && <FilteredMovieList movies={filteredMovies} />}
                {filteredMovies.length <= 0 && <Text style={styles.text}>Not found any movie</Text>}
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
        flexGrow: 0.01,
        paddingVertical: 15
    },
    movieList: {
        flexGrow: 1,
        position: 'relative',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    text: {
        position: 'absolute',
        top: '50%',
        left: 0,
        transform: [{ translateY: -50 }],
        color: Colors.whiteColor,
        textAlign: 'center',
        flexGrow: 1,
        width: '100%'
    }
});

export default HomeScreen;
