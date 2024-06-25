import React, { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import PagerView from 'react-native-pager-view';
import Colors from '../../styles/Colors';
import CarouselBulletNavigation from '../CarouselBulletNavigation/CarouselBulletNavigation';
import PagerViewItem from '../PagerViewItem/PagerViewItem';


const HomeCarousel = () => {

    const [currentIndex, setCurrentIndex] = React.useState(0);

    const pages = [
        { key: '1', text: 'First page' },
        { key: '2', text: 'Second page' },
        { key: '3', text: 'Third page' },
    ];

    useLayoutEffect(() => {
        return () => console.log('');
    }, []);


    return (
        <View style={styles.container}>
            <PagerView style={styles.pagerView} initialPage={0} useNext={true} onPageSelected={(event) => setCurrentIndex(event.nativeEvent.position)}>
                {pages.map((item: { key: string, text: string }) =>
                    <PagerViewItem key={item.key} text={item.text} currentIndex={currentIndex} />
                )}
            </PagerView>
            <CarouselBulletNavigation pages={pages} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    pagerView: {
        minHeight: 300
    }
});

export default HomeCarousel;
