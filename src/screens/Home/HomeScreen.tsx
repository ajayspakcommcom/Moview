import * as React from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import HomeCarousel from '../../components/HomeCarousel/HomeCarousel';

type Props = {
    navigation: StackNavigationProp<any>;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {

    const [itemDimensions, setItemDimensions] = React.useState({ width: 0, height: 0 });

    const goto = (screen: string) => {
        navigation.navigate('DetailScreen');
    };

    const handleLayout = (event: any, index: any) => {
        const { width, height } = event.nativeEvent.layout;
        setItemDimensions({ height: width + 50, width: width });
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: '100%'
        },
        movieList: {
            flex: 1,
            width: '100%',
            backgroundColor: 'grey',
        },

        scrollViewContent: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            backgroundColor: 'red'
        },

        item: {
            width: '50%',
            height: itemDimensions.height,
            backgroundColor: '#ffffff',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: '#cccccc',
        }
    });

    return (
        <View style={styles.container}>
            <HomeCarousel />
            <View style={styles.movieList}>
                <ScrollView horizontal={false} contentContainerStyle={styles.scrollViewContent}>
                    {Array.from(Array(20).keys()).map((index) => (
                        <View key={index} style={styles.item} onLayout={(event) => handleLayout(event, index)}>
                            <Text>{`Item ${index + 1}`}</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};


export default HomeScreen;
