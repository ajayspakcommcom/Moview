import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../styles/Colors';

const RightArrow = () => {
    return (        
            <View style={styles.arrowContainer}>
                <View style={styles.arrow} />
            </View>        
    );
};

const styles = StyleSheet.create({  
    text: {
        fontSize: 18,
        marginBottom: 20,
        color: 'white', // White text color
    },
    arrowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    arrow: {
        width: 0,
        height: 0,
        borderTopWidth: 10,     // Height of the triangle
        borderLeftWidth: 10,    // Base of the triangle (wider to form a full arrowhead)
        borderBottomWidth: 10,  // Height of the triangle
        borderTopColor: 'transparent',
        borderLeftColor: 'white', // White color for the arrowhead
        borderBottomColor: 'transparent',
    },
});

export default React.memo(RightArrow);
