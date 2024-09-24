import React from 'react';
import { FlatList, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import MyShowReviewItem from './MyShowReviewItem';
import { Review } from '../../models/Review';
import { API_URL } from '../../configure/config.android';
import { useAuth } from '../../context/AuthContext';
import Colors from '../../styles/Colors';
import { UserItem } from '../../types/User';
import { MovieReviewResponse, ShowReviewResponse } from '../../models/MyReview';
import Fonts from '../../styles/Fonts';
import MyMoviewReviewItem from './MyMoviewReviewItem';
import { hitSlops } from '../../utils/Common';




interface ListProps {
    userItem?: UserItem;
    isUser?: boolean;      
    movies: MovieReviewResponse[];
    shows: ShowReviewResponse[];
}

const showKeyExtractor = (item: ShowReviewResponse) => item._id;
const moviewKeyExtractor = (item: MovieReviewResponse) => item._id;

const MyReviewList: React.FC<ListProps> = ({ userItem, isUser = true, movies, shows }) => {

    const [activeTab, setActiveTab] = React.useState('movies');
    const [showReviewData, setShowReviewData] = React.useState<ShowReviewResponse[]>([]);
    const [movieReviewData, setMovieReviewData] = React.useState<MovieReviewResponse[]>([]);


    const getReviewListByUser = async () => {
        setMovieReviewData(movies);
        setShowReviewData(shows);
    };

     const handleTabClick = (tabName: string) => {
        setActiveTab(tabName);
    };

    

    React.useLayoutEffect(() => {

        getReviewListByUser();

        return () => {
            
        };
    }, []);

    return (
        <>                
            <View style={styles.castReviewBtnWrapper}>
                <TouchableOpacity hitSlop={hitSlops()} onPress={handleTabClick.bind(null, 'movies')}>
                    <View style={styles.castReviewText}><Text style={[styles.crText, activeTab === 'movies' && styles.crTextActive]}>Movies</Text></View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleTabClick.bind(null, 'shows')}>
                    <View style={styles.castReviewText}><Text style={[styles.crText, activeTab === 'shows' && styles.crTextActive]}>Shows</Text></View>
                </TouchableOpacity>               
            </View>

            {activeTab === 'movies' && 
                <>                   
                {movieReviewData.length > 0 && 
                    <FlatList
                        style={styles.container}
                        data={movieReviewData}
                        renderItem={({ item }) => <MyMoviewReviewItem item={item} isUser={isUser} />}
                        keyExtractor={moviewKeyExtractor}
                    />
                }
                </>
            }

            {activeTab === 'shows' &&
                <>
                {showReviewData.length > 0 && 
                    <FlatList
                        style={styles.container}
                        data={showReviewData}
                        renderItem={({ item }) => <MyShowReviewItem item={item} isUser={isUser} />}
                        keyExtractor={showKeyExtractor}
                    />
                }
                </>
            }
            
                    
            {  movieReviewData.length === 0 && showReviewData.length === 0 &&
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
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginBottom: 10,
    },
    castReviewText: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 50
    },
     crText: {
        fontSize: Fonts.Size.Medium,
        color: Colors.tabBgColor,
        fontWeight: '500'
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
        padding: 50
    },
    reviewText: {
        color: Colors.whiteColor,
        textAlign: 'center'
    }
});

export default React.memo(MyReviewList);
