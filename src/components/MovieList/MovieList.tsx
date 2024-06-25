import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, FlatList, RefreshControl, Button } from 'react-native';
import Colors from '../../styles/Colors';

interface MovieListProps {

}

type DataItem = {
    id: string;
    title: string;
};

const data: DataItem[] = [
    { id: '1', title: 'Item 1' },
    { id: '2', title: 'Item 2' },
    { id: '3', title: 'Item 3' },
    { id: '4', title: 'Item 4' },
    { id: '5', title: 'Item 5' },
    { id: '6', title: 'Item 6' },
    { id: '7', title: 'Item 7' },
    { id: '8', title: 'Item 8' },
    { id: '9', title: 'Item 9' },
    { id: '10', title: 'Item 10' },
    { id: '11', title: 'Item 11' },
];



const MovieList: React.FC<MovieListProps> = () => {

    const [refreshing, setRefreshing] = React.useState(false);
    const flatListRef = React.useRef<FlatList<any>>(null);

    const renderItem = ({ item }: { item: DataItem }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
        </View>
    );

    const ListFooter = () => (
        <View style={styles.footer}>
            <Text style={styles.footerText}>End of List</Text>
        </View>
    );

    const ListHeader = () => (
        <View style={styles.footer}>
            <Text style={styles.footerText}>Start of List</Text>
        </View>
    );

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
            console.log('Ram...');
        }, 2000);
    };

    const handleScrollToTop = () => {
        flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
        flatListRef.current?.flashScrollIndicators();
    };

    const handleScrollToEnd = () => {
        flatListRef.current?.scrollToEnd({ animated: true });
    };

    const handleScrollToIndex = (index: number) => {
        flatListRef.current?.scrollToIndex({ index, animated: true });
    };

    const handleScrollToItem = (itemId: string) => {
        const index = data.findIndex(item => item.id === itemId);
        if (index !== -1) {
            flatListRef.current?.scrollToIndex({ index, animated: true });
        }
    };

    const getItemLayout = (data: any[] | null | undefined, index: number) => ({
        length: 50,
        offset: 50 * index,
        index,
    });


    return (
        <>
            {/* <Button title="Scroll to Top" onPress={handleScrollToTop} />
            <Button title="Scroll To End" onPress={handleScrollToEnd} />
            <Button title="Scroll To Index" onPress={() => handleScrollToIndex(5)} />
            <Button title="Scroll to Item 8" onPress={() => handleScrollToItem('8')} /> */}
            <Text>dasdasd</Text>
            {/* <FlatList
                ref={flatListRef}
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.container}
                ListFooterComponent={<ListFooter />}
                ListHeaderComponent={<ListHeader />}
                horizontal={false}
                refreshControl={<RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={['#ff0000', '#00ff00', '#0000ff']}
                    progressBackgroundColor="yellow"
                />}
                numColumns={2}
                extraData={data}
                getItemLayout={getItemLayout}
            /> */}

        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingVertical: 20,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
    },
    title: {
        fontSize: 18,
    },
    footer: {
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#ccc',
    },
    footerText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default MovieList;
