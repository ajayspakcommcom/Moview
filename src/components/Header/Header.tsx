import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import Colors from '../../styles/Colors';

interface HeaderProps {
    message?: string;
}

const Header: React.FC<HeaderProps> = ({ message }) => {
    return (
        <View style={styles.headerWrapper}>
            <View style={[styles.childWrapper, { backgroundColor: 'red' }]}></View>
            <View style={[styles.childWrapper, { backgroundColor: 'pink' }]}></View>
            <View style={[styles.childWrapper, { backgroundColor: 'brown' }]}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerWrapper: {
        width: '100%',
        height: 100,
        backgroundColor: Colors.blackColor,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    childWrapper: {
        flex: 1,
        backgroundColor: 'red',
        height: 100,
        borderWidth: 1
    }
});

export default React.memo(Header);
