import React from 'react';
import { FlatList, StyleSheet, View, VirtualizedList } from 'react-native';
import CastItem from './CastItem';
import { Cast } from '../../models/Common';

interface ListProps {
    castList?: Cast[]
}

const keyExtractor = (item: Cast) => item._id;

const data: Cast[] = [
    { _id: '5', actor: 'John Doe', role: '' },
];





const CastList: React.FC<ListProps> = ({ castList }) => {



    React.useLayoutEffect(() => {

        return () => {

        }
    }, []);

    return (
        <>
            <FlatList
                style={styles.container}
                data={castList}
                renderItem={({ item }) => <CastItem item={item} />}
                keyExtractor={keyExtractor}
                numColumns={3}
            />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default React.memo(CastList);
