import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

type Product = {
  id: number;
  thumbnail: string;
};

type Cart = {
  id: number;
  products: Product[];
};

const moviePosters = [
  'aladdin-poster.jpg',
  'andhadhun-poster.jpg',
  'avengers-poster.jpg',
  'blackpanther-poster.jpg',
  'blacktothefuture-poster.jpg',
  'dark-poster.jpg',
  'flash-poster.jpg',
  'freedom-poster.jpg',
  'joker-poster.jpg',
  'kraven-poster.jpg',
  'mission-impossible-poster.jpg',
  'moonlight-poster.jpg',
  'pathaan-poster.jpg',
  'polis-poster.jpg',
  'starwars-poster.jpg',
  'thor-poster.jpg',
  'threethousandyears-poster.jpg',
  'thrillermovies-poster.jpg',
  'uncharted-poster.jpg',
  'wandavision-poster.jpg',
  'wood-poster.jpg'
];

const showPosters = [
    'balika-vadhu-poster.png',
    'bhabhi-ji-ghar-pe-hain-poster.png',
    'chandrakanta-poster.png',
    'kaisi-yeh-yaariaan-poster.png',
    'kapil-sharma-show-poster.png',
    'kasuati-zindagi-ki-poster.png',
    'kumkum-bhagya-poster.png',
    'kundali-bhagya-poster.png',
    'mirzapur-poster.png',
    'na-bole-tum-na-maine-kuch-kaha-poster.png',
    'naagin-poster.png',
    'paatal-lok-poster.png',
    'pyar-ki-yeh-ek-kahani-poster.png',
    'sasural-simar-ka-poster.png',
    'taarak-mehta-kaulta-chasma-poster.png',
    'the-family-man-poster.png',
    'udaan-poster.png',
    'yeh-rista-kya-kehlata-hai-poster.png'
];

const TestScreen = () => {

  const [movies, setMovies] = useState<string[]>([]);
  const [shows, setShows] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

 
  const moviePath = moviePosters.map(poster => `https://moviu.s3.us-east-1.amazonaws.com/movies/${poster}`);
  const showPath = showPosters.map(poster => `https://moviu.s3.us-east-1.amazonaws.com/shows/${poster}`);

  console.log('moviePath', moviePath);
  console.log('showPath', showPath);

  useEffect(() => {

    setMovies(moviePath);
    setShows(showPath);

    return () => console.log('');
  }, []);

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Moviews</Text>
      <FlatList
        data={movies}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.thumbnail} />
        )}
        contentContainerStyle={styles.listContainer}
        numColumns={3}
      />
      
      <Text style={styles.title}>Shows</Text>
      <FlatList
        data={shows}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.thumbnail} />
        )}
        contentContainerStyle={styles.listContainer}
        numColumns={3}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listContainer: {
    alignItems: 'flex-start',
  },
  thumbnail: {
    width: 150,
    height: 150,
    marginBottom: 10,
    borderRadius: 10,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },   
});

export default TestScreen;
