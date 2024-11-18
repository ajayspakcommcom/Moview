import React from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';

const TestComponent = () => {

  const DATA = [
    { id: '1', title: 'Apple' },
    { id: '2', title: 'Banana' },
    { id: '3', title: 'Cherry' },
    { id: '4', title: 'Date' },
    { id: '5', title: 'Elderberry' },
    { id: '6', title: 'Apple' },
    { id: '7', title: 'Banana' },
    { id: '8', title: 'Cherry' },
    { id: '9', title: 'Date' },
    { id: '10', title: 'Elderberry' },
    { id: '11', title: 'Apple' },
    { id: '12', title: 'Banana' },
    { id: '13', title: 'Cherry' },
    { id: '14', title: 'Date' },
    { id: '15', title: 'Elderberry' },
    { id: '16', title: 'Apple' },
    { id: '17', title: 'Banana' },
    { id: '18', title: 'Cherry' },
    { id: '19', title: 'Date' },
    { id: '20', title: 'Elderberry' }
  ];

  const renderItem = ({ item }: {item: {title: string}}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  const ListHeader = () => (
    <View style={styles.headerFooter}>
      <Text style={styles.headerFooterText}>Fruits List - Header</Text>
    </View>
  );

  const ListFooter = () => (
    <View style={styles.headerFooter}>
      <Text style={styles.headerFooterText}>End of the List - Footer</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatList} // Apply height here
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={ListFooter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    padding: 10,
  },
  flatList: {
    maxHeight: 500, // Set height here
    backgroundColor: '#f1f1f1', // Optional background for visualization
  },
  headerFooter: {
    backgroundColor: '#343a40',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  headerFooterText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  item: {
    backgroundColor: '#e9ecef',
    padding: 15,
    marginVertical: 8,
    borderRadius: 5,
  },
  title: {
    fontSize: 16,
  },
});

export default TestComponent;
