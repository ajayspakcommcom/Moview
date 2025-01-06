import React, { useLayoutEffect } from 'react';
import { View, StyleSheet, FlatList, RefreshControl, Dimensions, ActivityIndicator, Pressable } from 'react-native';
import Colors from '../../styles/Colors';
import { useNavigation, ParamListBase, NavigationProp } from '@react-navigation/native';
import { ShowItem } from '../../types/Show';
import { fetchMovies, fetchShows, getFirstThreeChars } from '../../utils/Common';
import { useAuth } from '../../context/AuthContext';
import FastImage from 'react-native-fast-image';
import { Text } from 'react-native-paper';
import Fonts from '../../styles/Fonts';
import { LastesMovieShowItem } from '../../types/LatestMovieShow';

interface ShowListProps {

}

const screenWidth = Dimensions.get('window').width;

const ShowList: React.FC<ShowListProps> = () => {

    const { user } = useAuth();

    const navigation: NavigationProp<ParamListBase> = useNavigation();
    const [showList, setShowList] = React.useState<ShowItem[]>([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const flatListRef = React.useRef<FlatList<any>>(null);
    const [loading, setLoading] = React.useState(true);

    const abortController = new AbortController();
    const signal = abortController.signal;

    const getShowList = React.useCallback(async () => {
        if (user) {
            try {
                const resp = await fetchShows(user.token!, signal);
    
                setTimeout(() => {
                    setShowList(resp.data.shows);
                    setLoading(false);
                }, 2000);
            } catch (error) {
                if (error instanceof Error) {
                    if (error.name === 'AbortError') {
                        // Handle abort error (e.g., when a fetch request is cancelled)
                    } else {
                        // Handle other errors
                    }
                } else {
                    // Handle non-error object as an error (edge case)
                }
                throw error; // Re-throw the error for the caller to handle if needed
            }
        }
    }, [user, signal, fetchShows, setShowList, setLoading]);

    useLayoutEffect(() => {

        getShowList();

        return () => {
            abortController.abort(); // Cleanup on unmount
        };
    }, [user?.token]);

    const onRefresh = () => {
        setRefreshing(true);
        getShowList();
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };

    const navigateToDetails = (showItem: ShowItem) => {
        navigation.navigate('ShowDetail', { showItem: showItem });
    };

    const renderItem = ({ item }: { item: LastesMovieShowItem }) => (
        <>
            <View style={[styles.item]}>
                <Pressable onPress={navigateToDetails.bind(null, item)} style={styles.pressable}>
                    <FastImage style={styles.image} source={{uri: item.poster_url}} resizeMode={FastImage.resizeMode.cover} />
                    <Text>{item.title}</Text>
                </Pressable>

                <View style={styles.category}>
                  <View style={styles.languageWrapper}>
                      <Text style={[styles.catergoryText]}>{getFirstThreeChars(item.language)}</Text>
                  </View>
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
                data={showList}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                horizontal={false}
                refreshControl={<RefreshControl
                    title='Loading...'
                    tintColor={Colors.tabActiveColor}
                    titleColor={Colors.whiteColor}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={[Colors.blackColor, Colors.darkBackgroudColor, Colors.playPauseButtonColor]}
                    progressBackgroundColor={Colors.tabActiveColor}
                />}
                numColumns={2}
                extraData={showList}
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
        overflow: 'hidden'
    },
    category: {
        position: 'absolute',
        left: 1,
        bottom: 0,
        display:'flex',
        flexDirection:'row', 
        paddingBottom:5,
        paddingLeft:5
    },
    languageWrapper: {
        backgroundColor: Colors.tagBgColor, 
        paddingVertical: 1,
        paddingHorizontal: 10,
        textAlign: 'center',
        verticalAlign:'top',
        borderRadius: 50,
        marginRight:5,
        fontFamily:Fonts.Family.Light,
        elevation:5, 
        borderWidth:1,
        borderColor:Colors.tagBorderColor, 
        paddingBottom:2
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

export default React.memo(ShowList);
