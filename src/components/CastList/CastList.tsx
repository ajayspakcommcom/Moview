import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Cast } from '../../models/Common';

const CastItem = React.lazy(() => import('./CastItem'));
const Loading = React.lazy(() => import('../Loading/Loading'));

interface ListProps {
    castList?: Cast[]
}

const keyExtractor = (item: Cast) => item._id;

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
                renderItem={({ item }) => <React.Suspense fallback={<Loading />}><CastItem item={item} /></React.Suspense>}
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
