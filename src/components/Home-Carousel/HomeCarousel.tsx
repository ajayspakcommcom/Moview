import React, { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import PagerView from 'react-native-pager-view';

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

    const renderPage = ({ key, text }: { key: string, text: string }) => (
        <View key={key} style={styles.page}>
            <View style={styles.pageItem}>
                <Text style={styles.text}>{text}</Text>
            </View>
        </View>
    );

    const renderBullets = () => (
        <View style={styles.bulletContainer}>
            {pages.map((_, index) => (
                <TouchableOpacity
                    key={index}
                    style={[
                        styles.bullet,
                        index === currentIndex && styles.activeBullet,
                    ]}
                    onPress={() => setCurrentIndex(index)}
                />
            ))}
        </View>
    );


    return (
        <View style={styles.container}>
            <PagerView style={styles.pagerView} initialPage={0} useNext={true} onPageSelected={(event) => setCurrentIndex(event.nativeEvent.position)}>
                {pages.map((item: { key: string, text: string }) =>
                    <View key={item.key} style={styles.page}>
                        <View style={styles.pageItem}>
                            <Text style={styles.text}>{item.text} {currentIndex}</Text>
                        </View>
                    </View>
                )}
            </PagerView>
            {renderBullets()}
        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        height: 300
    },

    pagerView: {
        minHeight: '50%'
    },

    page: {
        flex: 1,
        backgroundColor: 'yellow'
    },

    pageItem: {
        minHeight: '100%',
        borderRadius: 5,
        backgroundColor: 'pink',
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },

    bulletContainer: {
        backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        height: 50
    },
    bullet: {
        width: 15,
        height: 15,
        borderRadius: 5,
        backgroundColor: '#ccc',
        marginHorizontal: 15,
    },
    activeBullet: {
        backgroundColor: 'blue',
    },

    text: {
        color: '#fff'
    }
});

export default HomeCarousel;
