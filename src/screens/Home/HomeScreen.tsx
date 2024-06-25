import * as React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import HomeCarousel from '../../components/HomeCarousel/HomeCarousel';

type Props = {
    navigation: StackNavigationProp<any>;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {

    const goto = (screen: string) => {
        navigation.navigate('DetailScreen');
    };

    return (
        <View style={styles.container}>
            <HomeCarousel />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%'
    }
});

export default HomeScreen;
