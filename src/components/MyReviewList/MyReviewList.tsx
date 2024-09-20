import React from 'react';
import { FlatList, StyleSheet, View, Text, Button } from 'react-native';
import MyShowReviewItem from './MyShowReviewItem';
import { Review } from '../../models/Review';
import { API_URL } from '../../configure/config.android';
import { useAuth } from '../../context/AuthContext';
import Colors from '../../styles/Colors';
import { UserItem } from '../../types/User';
import { MovieReviewResponse, ShowReviewResponse } from '../../models/MyReview';
import Fonts from '../../styles/Fonts';
import MyMoviewReviewItem from './MyMoviewReviewItem';


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
            {showReviewData.length > 0 &&
                <>
                    <View style={styles.headingWrapper}>
                        <Text style={styles.heading}>Show Review</Text>                        
                    </View>
                    <FlatList
                        style={styles.container}
                        data={showReviewData}
                        renderItem={({ item }) => <MyShowReviewItem item={item} isUser={isUser} />}
                        keyExtractor={showKeyExtractor}
                    />
                </>
            }
            {
                showReviewData.length === 0 &&
                <View style={styles.noReviewWrapper}>
                    <Text style={styles.reviewText}>No Review found</Text>
                </View>
            }

            {movieReviewData.length > 0 &&
                <>
                    <View style={styles.headingWrapper}>
                        <Text style={styles.heading}>Movie Review</Text>                        
                    </View>
                    <FlatList
                        style={styles.container}
                        data={movieReviewData}
                        renderItem={({ item }) => <MyMoviewReviewItem item={item} isUser={isUser} />}
                        keyExtractor={moviewKeyExtractor}
                    />
                </>
            }
            {
                movieReviewData.length === 0 &&
                <View style={styles.noReviewWrapper}>
                    <Text style={styles.reviewText}>No Review found</Text>
                </View>
            }
            
        </>
    );
};

const styles = StyleSheet.create({
    headingWrapper: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginHorizontal:15,        
    },
    heading: {
        fontFamily:Fonts.Family.Bold,
        fontSize:Fonts.Size.Medium,
        color:Colors.whiteColor,
        marginHorizontal:15,
        marginVertical:10
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
