import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import CastItem from './CastItem';
import { Cast } from '../../models/Common';

interface ListProps { }

const keyExtractor = (item: Cast) => item.id;

const data: Cast[] = [
    { id: '1', name: 'Ajay Vishwakarma' },
    { id: '2', name: 'Omkar Sawant' },
    { id: '3', name: 'Nilesh Acharekar' },
    { id: '4', name: 'Omkar Sawant' },
    { id: '5', name: 'John Doe' },
    { id: '6', name: 'Jane Smith' },
    { id: '7', name: 'Alice Johnson' },
    { id: '8', name: 'David Lee' },
    { id: '9', name: 'Sarah Brown' },
    { id: '10', name: 'Michael Clark' },
];


const CastList: React.FC<ListProps> = () => {
    return (
        <FlatList
            style={styles.container}
            data={data}
            renderItem={({ item }) => <CastItem item={item} />}
            keyExtractor={keyExtractor}
            numColumns={3}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default CastList;
