import React, { useLayoutEffect } from 'react';
import { View, StyleSheet, FlatList, RefreshControl, Dimensions, ActivityIndicator, Pressable } from 'react-native';
import Colors from '../../styles/Colors';
import { useNavigation, ParamListBase, NavigationProp } from '@react-navigation/native';
import { LastesMovieShowItem } from '../../types/LatestMovieShow';
import { useAuth } from '../../context/AuthContext';
import FastImage from 'react-native-fast-image';
import { API_URL } from '../../configure/config.android';
import { Text } from 'react-native-paper';
import LatestMovieShowImageMap from '../../utils/LatestMovieShowImageMap';

interface LatestMovieShowListProps {
}

const screenWidth = Dimensions.get('window').width;

const LatestMovieShowList: React.FC<LatestMovieShowListProps> = () => {

    const { user } = useAuth();

    const navigation: NavigationProp<ParamListBase> = useNavigation();
    const [latestMovieShowList, setLatestMovieShowList] = React.useState<LastesMovieShowItem[]>([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const flatListRef = React.useRef<FlatList<any>>(null);
    const [loading, setLoading] = React.useState(true);

    const abortController = new AbortController();
    const signal = abortController.signal;

    const getLatestMovieShowList = async () => {

        const url = `${API_URL}latest/movie-show`;
        const token = user;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token?.token}`,
                    'Content-Type': 'application/json'
                },
                signal: signal
            });

            const result = await response.json();

            if (result.status === 'success') {
                const sortedData = result.data.sort((a: any, b: any) => {
                    return a.title.localeCompare(b.title);
                });

                setLatestMovieShowList(sortedData);
                setLoading(false);
            }

        } catch (error) {
            if (error instanceof Error) {
                if (error.name === 'AbortError') {

                } else {
                    //
                }
            } else {
                //
            }
            throw error;
        }

    };

    useLayoutEffect(() => {

        getLatestMovieShowList();

        return () => {
            abortController.abort();
        };
    }, [user?.token]);

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };

    const navigateToDetails = (latestMovieShowItem: LastesMovieShowItem) => {        
        if (latestMovieShowItem.isShow) {
            navigation.navigate('ShowDetail', { showItem: latestMovieShowItem });
        } else {
            navigation.navigate('DetailScreen', { movie: latestMovieShowItem });
        }
    };

    const renderItem = ({ item }: { item: LastesMovieShowItem }) => (
        <>
            <View style={[styles.item]}>
                <Pressable onPress={navigateToDetails.bind(null, item)} style={styles.pressable}>
                    <FastImage
                        style={styles.image} // Styles for the image
                        source={LatestMovieShowImageMap[item.poster_url]} // Source of the image
                        resizeMode={FastImage.resizeMode.cover} // Resize mode to cover the container
                    />
                </Pressable>
                <View style={styles.category}>
                    {item.isMovie && <Text style={styles.catergoryText}>Movie</Text>}
                    {item.isShow && <Text style={styles.catergoryText}>Show</Text>}
                </View>
            </View>
        </>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.tabActiveColor} />
            </View>
        );
    }

    return (
        <>
            <FlatList
                ref={flatListRef}
                data={latestMovieShowList}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                horizontal={false}
                refreshControl={<RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={[Colors.blackColor, Colors.darkBackgroudColor, Colors.playPauseButtonColor]}
                    progressBackgroundColor={Colors.tabActiveColor}
                />}
                numColumns={2}
                extraData={latestMovieShowList}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
        </>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        width: ((screenWidth) / 2),
        height: (screenWidth / 2) + 55,
        overflow: 'hidden',
        position: 'relative'
    },
    category: {
        position: 'absolute',
        backgroundColor: Colors.categoryRedColor,
        left: 1,
        bottom: 0,
        paddingVertical: 1,
        paddingHorizontal: 10,
        textAlign: 'center',
        borderRadius: 2,
    },
    catergoryText: {
        color: Colors.whiteColor
    },
    pressable: {
        flex: 1
    },
    image: {
        width: ((screenWidth - 6) / 2),
        height: (screenWidth / 2) + 55,
        alignSelf: 'center',
    },
    text: {
        color: Colors.whiteColor,
        fontSize: 50
    },
    separator: {
        height: 3
    }
});

export default React.memo(LatestMovieShowList);
