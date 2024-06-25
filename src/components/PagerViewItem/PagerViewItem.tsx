import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HomeCarouselVideo from '../HomeCarouselVideo/HomeCarouselVideo';

interface PagerViewItemProps {
    text: string;
    currentIndex: number;
}

const PagerViewItem: React.FC<PagerViewItemProps> = ({ text, currentIndex }) => {
    return (

        <View style={styles.pageItem}>
            <HomeCarouselVideo
                title="Another Example"
                content="Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                backgroundColor="lightgreen"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    pageItem: {
        height: 300
    }
});

export default PagerViewItem;
