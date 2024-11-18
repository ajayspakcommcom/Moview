import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

type Product = {
  id: number;
  thumbnail: string;
};

type Cart = {
  id: number;
  products: Product[];
};

const TestScreen = () => {

  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    const fetchThumbnails = async () => {
      try {
        const response = await fetch('https://dummyjson.com/carts');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const thumbnailsArray: string[] = data.carts.flatMap((cart: Cart) => cart.products.map((product) => product.thumbnail));

        setThumbnails(thumbnailsArray);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchThumbnails();

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
      <Text style={styles.title}>Thumbnails</Text>
      <FlatList
        data={thumbnails}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.thumbnail} />
        )}
        contentContainerStyle={styles.listContainer}
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
    alignItems: 'center',
  },
  thumbnail: {
    width: 100,
    height: 100,
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
