import React from 'react';
import { View, StyleSheet } from 'react-native';

const TestScreen = () => {
    return (
        <View style={styles.parent}>
            <View style={styles.child}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    parent: {
        width: '100%',
        height: 500,
        backgroundColor: 'red',
        position: 'relative',
    },
    child: {
        width: 50,
        height: 50,
        backgroundColor: 'blue', // Child background color
        // position: 'absolute', // Position child absolutely within parent
        top: '50%', // Center vertically
        left: '50%', // Center horizontally
        transform: [{ translateX: -25 }, { translateY: -25 }], // Adjust for child size
        borderRadius: 25, // Make it a circle (adjustable based on your needs)
    },
});

export default TestScreen;
