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
}

const showKeyExtractor = (item: ShowReviewResponse) => item._id;
const moviewKeyExtractor = (item: MovieReviewResponse) => item._id;

const MyReviewList: React.FC<ListProps> = ({ userItem, isUser = true }) => {

    const { user, counter, appCounter} = useAuth();
    const abortController = new AbortController();
    const signal = abortController.signal;

    const [activeTab, setActiveTab] = React.useState('movies');

    const [showReviewData, setShowReviewData] = React.useState<ShowReviewResponse[]>([]);
    const [movieReviewData, setMovieReviewData] = React.useState<MovieReviewResponse[]>([]);


    const getReviewListByUser = async () => {

        const movieUrl = `${API_URL}review/user/${userItem?._id}`;
        const showUrl = `${API_URL}review-show/user/${userItem?._id}`;
        const token = user;
        const headers = {
            'Authorization': `Bearer ${token?.token}`,
            'Content-Type': 'application/json'
        }

        try {

            const [movieResponse, showResponse] = await Promise.all([
                fetch(movieUrl, { method: 'GET', headers: { ...headers }, signal: signal }),
                fetch(showUrl, { method: 'GET', headers: { ...headers }, signal: signal }),
            ]);

            const movieData = await movieResponse.json();
            const showData = await showResponse.json();

            if (movieData.status === 'success') { 
                setMovieReviewData(movieData.data.reviews);
            }

            if (showData.status === 'success') { 
                setShowReviewData(showData.data.reviews);
            }

        } catch (error) {
            if (error instanceof Error) {
                if (error.name === 'AbortError') {
                    //
                }
            }
        }
    };

     const handleTabClick = (tabName: string) => {
        setActiveTab(tabName);
    };

    React.useLayoutEffect(() => {

        if (userItem) {
            getReviewListByUser();
        }

        return () => {
            abortController.abort();
        };
    }, [userItem, counter]);

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
