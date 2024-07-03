import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ReviewItem from './ReviewItem';
import { Review } from '../../models/Common';

interface ListProps { }

const keyExtractor = (item: Review) => item.id;

const desc = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`;

const data: Review[] = [
    { id: '1', name: 'Ajay Vishwakarma', rating: 4, award: 'gold', description: desc },
    { id: '2', name: 'Omkar Sawant', rating: 3, award: 'silver', description: desc },
    { id: '3', name: 'Nilesh Acharekar', rating: 3, award: 'gold', description: desc },
    { id: '4', name: 'Omkar Sawant', rating: 3, award: 'bronze', description: desc },
    { id: '5', name: 'John Doe', rating: 5, award: 'gold', description: desc },
    { id: '6', name: 'Jane Smith', rating: 4, award: 'silver', description: desc },
    { id: '7', name: 'Alice Johnson', rating: 4, award: 'bronze', description: desc },
    { id: '8', name: 'David Lee', rating: 3, award: 'gold', description: desc },
    { id: '9', name: 'Sarah Brown', rating: 5, award: 'silver', description: desc },
    { id: '10', name: 'Michael Clark', rating: 4, award: 'bronze', description: desc },
];


const ReviewList: React.FC<ListProps> = () => {
    return (
        <FlatList
            style={styles.container}
            data={data}
            renderItem={({ item }) => <ReviewItem item={item} />}
            keyExtractor={keyExtractor}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default ReviewList;
