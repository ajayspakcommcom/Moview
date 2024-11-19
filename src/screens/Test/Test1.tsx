import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import {API_URL} from '../../configure/config.android';
import {useAuth} from '../../context/AuthContext';
import {LastesMovieShowItem} from '../../types/LatestMovieShow';

interface LoadingProps {
  message?: string;
}

// Functional component with optional message prop
const Test1: React.FC<LoadingProps> = ({message = 'Test1'}) => {
  const {user} = useAuth();
  const [latestMovieShowList, setLatestMovieShowList] = React.useState<
    LastesMovieShowItem[]
  >([]);

  const getLatestMovieShowList = async () => {
    const url = `${API_URL}latest/movie-show`;
    const token = user;
    const abortController = new AbortController();
    const signal = abortController.signal;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {Authorization: `Bearer ${token?.token}`, 'Content-Type': 'application/json'},
        signal: signal,
      });

      const result = await response.json();

      if (result.status === 'success') {
        const sortedData = result.data.sort((a: any, b: any) => a.title.localeCompare(b.title));
        setLatestMovieShowList(sortedData);
        console.clear();
        console.log('sortedData', sortedData.length);
      }
    } catch (error) {
      console.log('');
    }
  };

  React.useLayoutEffect(() => {
    getLatestMovieShowList();
  }, []);

  const renderItem = ({item}: {item: any}) => (
    <>
       <View style={styles.imageWrapper}>
        {item.test_poster_url && <Image source={{uri: `https://moviu.s3.us-east-1.amazonaws.com/movies/${item.test_poster_url}`}} style={styles.image} />}   
        <Text>{item.test_poster_url}</Text>      
       </View> 
    </>
  );

  return (
    <View style={styles.container}>
      <FlatList data={latestMovieShowList} renderItem={renderItem} keyExtractor={(item, index) => index.toString()} numColumns={2} contentContainerStyle={styles.list} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    justifyContent: 'center',
  },
  imageWrapper : {
    backgroundColor:'red'
  },
  image: {
    width: (Dimensions.get('window').width/2) - 20,
    height: 100,
    margin: 10,
    borderRadius: 5,
  },
});

export default React.memo(Test1);
