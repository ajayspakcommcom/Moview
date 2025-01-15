import React from 'react';
import { FlatList, StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import MyShowReviewItem from './MyShowReviewItem';
import Colors from '../../styles/Colors';
import { UserItem } from '../../types/User';
import { MovieReviewResponse, ShowReviewResponse } from '../../models/MyReview';
import Fonts from '../../styles/Fonts';
import MyMoviewReviewItem from './MyMoviewReviewItem';
import { hitSlops } from '../../utils/Common';
import { ScrollView } from 'react-native-gesture-handler';
import { TabView, SceneRendererProps, NavigationState } from 'react-native-tab-view';




type Route = {
    key: string;
    render?: () => React.ReactNode;
};

type State = NavigationState<Route>;

interface ListProps {
    userItem?: UserItem;
    isUser?: boolean;
    movies: MovieReviewResponse[];
    shows: ShowReviewResponse[];
}

const showKeyExtractor = (item: ShowReviewResponse) => item._id;
const moviewKeyExtractor = (item: MovieReviewResponse) => item._id;

const MyReviewList: React.FC<ListProps> = ({ userItem, isUser = true, movies, shows }) => {

    const [showReviewData, setShowReviewData] = React.useState<ShowReviewResponse[]>([]);
    const [movieReviewData, setMovieReviewData] = React.useState<MovieReviewResponse[]>([]);

    const [index, setIndex] = React.useState(0);
    const { width } = Dimensions.get('screen');

    const routes = React.useMemo(
        () => [
            {
                key: 'movies',
                render: () => (
                    <View style={styles.castReviewText}><Text style={[styles.crText]}>Movies</Text></View>
                ),
            },
            {
                key: 'shows',
                render: () => (
                    <View style={styles.castReviewText}><Text style={[styles.crText]}>Shows</Text></View>
                ),
            }
        ],
        []
    );

    const renderScene = ({ route }: { route: Route }) => {
        switch (route.key) {
            case 'movies':
                return (<>
                    {movieReviewData.length > 0 &&
                        <FlatList
                            style={styles.container}
                            data={movieReviewData}
                            renderItem={({ item }) => <MyMoviewReviewItem item={item} isUser={isUser} />}
                            keyExtractor={moviewKeyExtractor}
                            scrollEnabled={true}
                            nestedScrollEnabled={true}
                        />
                    }
                </>);
            case 'shows':
                return (<>
                    {showReviewData.length > 0 &&
                        <FlatList
                            style={styles.container}
                            data={showReviewData}
                            renderItem={({ item }) => <MyShowReviewItem item={item} isUser={isUser} />}
                            keyExtractor={showKeyExtractor}
                        />
                    }
                </>);
            default:
                console.log('Default');
                return null;
        }
    };


    const renderTabBar = (props: SceneRendererProps & { navigationState: State }) => (
        <View style={styles.castReviewBtnWrapper}>
            {props.navigationState.routes.map((route, i) => (
                <TouchableOpacity key={route.key} onPress={() => setIndex(i)} style={[styles.tabItem, index === i && styles.activeTab]}>                    
                    <View style={styles.castReviewText}><Text style={[styles.crText, { color: index === i ? Colors.tabActiveColor : Colors.whiteColor }]}>{route['key']}</Text></View>
                </TouchableOpacity>
            ))}
        </View>
    );

    const getReviewListByUser = async () => {
        setMovieReviewData(movies);
        setShowReviewData(shows);
    };


    React.useLayoutEffect(() => {
        getReviewListByUser();
    }, [movies, shows]);

    return (
        <>


            <TabView
                style={{ backgroundColor: Colors.backgroundColorShadow }}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                renderTabBar={renderTabBar}
                initialLayout={{ width: width }}
            />

            {movieReviewData.length === 0 && showReviewData.length === 0 &&
                <View style={styles.noReviewWrapper}>
                    <Text style={styles.reviewText}>No Review found</Text>
                </View>
            }

        </>
    );
};

const styles = StyleSheet.create({
    castReviewBtnWrapper: {
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    castReviewText: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 50
    },
    crText: {
        fontSize: Fonts.Size.Medium,
        color: Colors.whiteColor,
        fontWeight: '500',        
        textTransform:'capitalize'
    },

    crTextActive: {
        color: Colors.whiteColor,
    },
    container: {
        flex: 1,
        paddingHorizontal: 20
    },
    noReviewWrapper: {
        marginHorizontal: 15,
        marginVertical: 15,
        padding: 50,
        height: Dimensions.get('window').height - 120,
        justifyContent: 'center'
    },
    reviewText: {
        color: Colors.whiteColor,
        textAlign: 'center'
    },
    tabItem: {
        flexGrow: 1,
        alignItems: 'center',
        padding: 10,
        paddingHorizontal: 15,
        justifyContent: 'center',
        borderBottomWidth: 3,
        borderBottomColor: 'transparent'
    },
    activeTab: {
        borderBottomColor: Colors.tabActiveColor,                
    }
});

export default React.memo(MyReviewList);
