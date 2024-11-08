import * as React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import Colors from '../../styles/Colors';
import { Searchbar } from 'react-native-paper';
import { MovieItem } from '../../types/Movie';
import debounce from 'lodash.debounce';


const FilteredMovieList = React.lazy(() => import('../../components/MovieList/FilteredMovieList'));
const Loading = React.lazy(() => import('../../components/Loading/Loading'));

type Props = {
    navigation: StackNavigationProp<any>;
};

const HomeScreen: React.FC<Props> = () => {

    const [searchQuery, setSearchQuery] = React.useState<string>('');
    const [filteredMovies, setFilteredMovies] = React.useState<MovieItem[]>([]);

    const debouncedSearch = React.useCallback(
        debounce((query) => {            
            console.log("Searching for:", query);
        }, 3000), 
        []
    );

    const onChangeSearch = (query: string) => {
        setSearchQuery(query);    
        debouncedSearch(query)
    };

    const onClearHandler = () => {
        //setFilteredMovies(MovieDataList);
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
                {filteredMovies.length >= 0 && <React.Suspense fallback={<Loading />}><FilteredMovieList movies={filteredMovies} /></React.Suspense>}
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
