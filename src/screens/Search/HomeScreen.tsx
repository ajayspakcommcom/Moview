import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import Colors from '../../styles/Colors';
import { Searchbar } from 'react-native-paper';
import debounce from 'lodash.debounce';
import { useAuth } from '../../context/AuthContext';
import { fetchMoviesShowsByKeyword } from '../../utils/Common';

import { FilteredLatestMovieShow } from '../../types/FilteredLatestMovieShow';
import FastImage from 'react-native-fast-image';
const FilteredLatestMovieShowList = React.lazy(() => import('../../components/FilteredLatestMovieShowList/FilteredLatestMovieShowList'));

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

    const onChangeSearch = React.useCallback((query: string) => {
          setSearchQuery(query);    
          debouncedSearch(query);              
        },
        [setSearchQuery] 
      );

    const onClearHandler = () => {
     
    };


    return (
        <View style={styles.container}>

            <View style={styles.searchWrapper}>
                <Searchbar 
                placeholder="Search Movie / Show" 
                onChangeText={onChangeSearch} 
                value={searchQuery} 
                onClearIconPress={onClearHandler} 
                icon={() => (
                    <FastImage style={{width:25, height:25}} source={require('../../assets/images/icons/search-b.png')} />
                )}

                clearIcon={() =>
                    searchQuery ? (
                        <FastImage
                          style={{width:25, height:25}}
                          source={require('../../assets/images/icons/close-b.png')} 
                        />
                    ) : null
                  }

                />
            </View>

            <View style={styles.movieList}>                
                {filteredData.length >= 0 && <FilteredLatestMovieShowList filteredLatestMovieShows={filteredData} />}                 
                {filteredData.length <= 0 && <Text style={styles.text}>Not found any movie / show</Text>} 
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
