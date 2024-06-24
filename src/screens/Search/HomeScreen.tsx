import * as React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import Colors from '../../styles/Colors';

type Props = {
    navigation: StackNavigationProp<any>; // Replace with appropriate navigation prop type
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {

    const goToDetailScreen = () => {
        navigation.navigate('DetailScreen');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Search Screen</Text>
            <Button title="Go to Detail Screen" onPress={goToDetailScreen} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.whiteColor,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default HomeScreen;
