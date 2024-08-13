import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import Colors from '../../styles/Colors';

// Define props interface (optional if you have specific props)
interface LoadingProps {
    message?: string;
}

// Functional component with optional message prop
const Test4: React.FC<LoadingProps> = ({ message = 'Test4' }) => {
    return (
        <View style={styles.container}>
            {/* <ActivityIndicator size="large" color={Colors.tabActiveColor} /> */}
            {message && <Text style={styles.message}>{message}</Text>}
        </View>
    );
};

// Styles for the component
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    message: {
        marginTop: 10,
        fontSize: 16,
        color: '#000',
    },
});

export default React.memo(Test4);
