import React, { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import PagerView from 'react-native-pager-view';
import Colors from '../../styles/Colors';
import CarouselBulletNavigation from '../CarouselBulletNavigation/CarouselBulletNavigation';
import PagerViewItem from '../PagerViewItem/PagerViewItem';


const HomeCarousel = () => {

    const [currentIndex, setCurrentIndex] = React.useState(0);

    const pages = [
        { key: '1', text: 'First page', videoUrl: 'https://videos.pexels.com/video-files/4440931/4440931-hd_1920_1080_25fps.mp4' },
        { key: '2', text: 'Second page', videoUrl: 'https://videos.pexels.com/video-files/4620563/4620563-uhd_1440_2732_25fps.mp4' },
        { key: '3', text: 'Third page', videoUrl: 'https://videos.pexels.com/video-files/8273661/8273661-uhd_2732_1440_25fps.mp4' },
    ];

    useLayoutEffect(() => {
        return () => console.log('');
    }, []);


    return (
        <View style={styles.container}>
            <PagerView initialPage={0} useNext={true} onPageSelected={(event) => setCurrentIndex(event.nativeEvent.position)} style={styles.PagerView}>
                {pages.map((item: { key: string, text: string, videoUrl: string }) =>
                    <PagerViewItem key={item.key} text={item.text} currentIndex={currentIndex} videoUrl={item.videoUrl} />
                )}
            </PagerView>
            <CarouselBulletNavigation pages={pages} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 300,
        backgroundColor: 'pink',
        position: 'relative'
    },

    PagerView: {
        backgroundColor: 'green'
    }
});

export default React.memo(HomeCarousel);
