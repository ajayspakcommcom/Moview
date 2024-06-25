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

    },
    pageItem: {
        height: 300,
        borderRadius: 5,
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default PagerViewItem;
