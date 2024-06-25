import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../../styles/Colors';

interface CarouselBulletNavigationProps {
    pages: { key: string, text: string }[];
    currentIndex: number;
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

const CarouselBulletNavigation: React.FC<CarouselBulletNavigationProps> = ({ pages, currentIndex, setCurrentIndex }) => {



    return (
        <View style={styles.bulletContainer}>
            {pages.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    style={[styles.bullet, index === currentIndex && styles.activeBullet]}
                    onPress={() => setCurrentIndex(index)}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    bulletContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -50,
        height: 50
    },
    bullet: {
        width: 15,
        height: 15,
        borderRadius: 50,
        backgroundColor: Colors.whiteColor,
        marginHorizontal: 15,
        borderWidth: 2,
        borderColor: Colors.whiteColor
    },
    activeBullet: {
        backgroundColor: Colors.carouselActiveColor,
    }
});

export default CarouselBulletNavigation;
