import React from 'react';
import { FlatList, StyleSheet, View, Text, Button } from 'react-native';
import ReviewItem from './MyShowReviewItem';
import { Review } from '../../models/Review';
import { API_URL } from '../../configure/config.android';
import { useAuth } from '../../context/AuthContext';
import Colors from '../../styles/Colors';
import { UserItem } from '../../types/User';
import { MovieReviewResponse, ShowReviewResponse } from '../../models/MyReview';


interface ListProps {
    userItem?: UserItem;
    isUser?: boolean;      
}

const keyExtractor = (item: Review) => item._id;

const MyReviewList: React.FC<ListProps> = ({ userItem, isUser = true }) => {

    const { user, counter, appCounter} = useAuth();
    const abortController = new AbortController();
    const signal = abortController.signal;
    const [reviewData, setReviewData] = React.useState<Review[]>([]);


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

            if (movieData.status === 'success' && showData.status === 'success') {                
                setReviewData([...movieData.data.reviews, ...showData.data.reviews]);
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
            
            {reviewData.length > 0 &&
                <FlatList
                    style={styles.container}
                    data={reviewData}
                    renderItem={({ item }) => <ReviewItem item={item} isUser={isUser} />}
                    keyExtractor={keyExtractor}
                />
            }
            {
                reviewData.length === 0 &&
                <View style={styles.noReviewWrapper}>
                    <Text style={styles.reviewText}>No Review found</Text>
                </View>
            }

        </>
    );
};

const styles = StyleSheet.create({
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
