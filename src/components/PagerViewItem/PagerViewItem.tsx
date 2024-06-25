import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface PagerViewItemProps {
    text: string;
    currentIndex: number;
}

const PagerViewItem: React.FC<PagerViewItemProps> = ({ text, currentIndex }) => {
    return (
        <View style={styles.page}>
            <View style={styles.pageItem}>
                <Text>{text} {currentIndex}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    page: {
        flex: 1,
    },
    pageItem: {
        minHeight: '100%',
        borderRadius: 5,
        backgroundColor: 'pink',
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default PagerViewItem;
