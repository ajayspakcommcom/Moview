import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HomeCarouselVideo from '../HomeCarouselVideo/HomeCarouselVideo';

interface PagerViewItemProps {
    text: string;
    currentIndex: number;
}

const PagerViewItem: React.FC<PagerViewItemProps> = ({ text, currentIndex }) => {
    return (
        <View style={styles.page}>
            <View style={styles.pageItem}>
                <Text>{text} {currentIndex}</Text>
                <HomeCarouselVideo
                    title="Another Example"
                    content="Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    backgroundColor="lightgreen"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    page: {
        flex: 1,
    },
    pageItem: {
        position: 'relative',
        minHeight: '100%',
        borderRadius: 5,
        backgroundColor: 'pink',
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default PagerViewItem;
