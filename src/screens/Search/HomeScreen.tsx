import * as React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import Colors from '../../styles/Colors';
import { Searchbar } from 'react-native-paper';
import { MovieItem } from '../../types/Movie';
import debounce from 'lodash.debounce';
import { API_URL } from '../../configure/config.android';
import { useAuth } from '../../context/AuthContext';
import { fetchMoviesShowsByKeyword } from '../../utils/Common';

import { FilteredLatestMovieShow } from '../../types/FilteredLatestMovieShow';
const FilteredLatestMovieShowList = React.lazy(() => import('../../components/FilteredLatestMovieShowList/FilteredLatestMovieShowList'));

const FilteredMovieList = React.lazy(() => import('../../components/MovieList/FilteredMovieList'));
const Loading = React.lazy(() => import('../../components/Loading/Loading'));

type Props = {
    navigation: StackNavigationProp<any>;
};

const HomeScreen: React.FC<Props> = () => {

    const { user } = useAuth();
    const [searchQuery, setSearchQuery] = React.useState<string>('');
    const [filteredData, setFilteredData] = React.useState<FilteredLatestMovieShow[]>([]);
    
    const abortController = new AbortController();
    const signal = abortController.signal;

    const debouncedSearch = React.useCallback(
        debounce((query) => {     

            async function fetchFilteredShowsMovies () {
                try 
                {
                    const resp = await fetchMoviesShowsByKeyword(user?.token!, signal, query.trim());
                    console.log('resp.data', resp.data);                                       
                    if(resp.data) {
                        setFilteredData(resp.data);
                    }
                } catch(error) {
                    console.log(`Error : `, error);
                }
            }

            fetchFilteredShowsMovies();            

        }, 500), 
        []
    );

    // const onChangeSearch = (query: string) => {
    //     setSearchQuery(query);    
    //     debouncedSearch(query)
    // };

    const onChangeSearch = React.useCallback((query: string) => {
          setSearchQuery(query);    
          debouncedSearch(query);              
        },
        [setSearchQuery] 
      );

    const onClearHandler = () => {

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
                {filteredData.length >= 0 && <FilteredLatestMovieShowList filteredLatestMovieShows={filteredData} />} 
                {/* {filteredMovies.length >= 0 && <React.Suspense fallback={<Loading />}><FilteredMovieList movies={filteredMovies} /></React.Suspense>} */}
                {filteredData.length <= 0 && <Text style={styles.text}>Not found any movie</Text>} 
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
