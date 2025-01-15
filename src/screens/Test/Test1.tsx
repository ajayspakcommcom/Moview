import React from 'react';
import { View, Text, StyleSheet, ImageBackground, FlatList } from 'react-native';
import { BlurView } from '@react-native-community/blur';

interface ReviewItemProps {
  item: {
    id: string;
    review: string;
  };
}

const movieReviewData = [
  { id: '1', review: 'Great movie!' },
  { id: '2', review: 'Not bad, enjoyed it.' },
  { id: '3', review: 'Could be better.' },
  { id: '4', review: 'Loved the acting!' },
  { id: '5', review: 'Fantastic visuals!' },
  { id: '6', review: 'Average storyline.' },
  { id: '7', review: 'Highly recommended!' },
  { id: '8', review: 'Not my cup of tea.' },
  { id: '9', review: 'Amazing soundtrack!' },
  { id: '10', review: 'Worth watching again.' }
];

const MyMovieReviewItem: React.FC<ReviewItemProps> = ({ item }) => (
  <View style={styles.itemContainer}>
    <Text>{item.review}</Text>
  </View>
);

const Test1: React.FC = () => {

  return (
    <FlatList
        style={{backgroundColor:'pink'}}
        data={movieReviewData}
        renderItem={({ item }) => <MyMovieReviewItem item={item} />}
        keyExtractor={(item) => item.id}
        scrollEnabled={true}
      />
  )
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: 'red',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2    
  },
});

export default Test1;
