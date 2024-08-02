import React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import ReviewItem from './MyReviewItem';
import { Review } from '../../models/Review';
import { API_URL } from '../../configure/config.android';
import { useAuth } from '../../context/AuthContext';
import { MovieItem } from '../../types/Movie';
import Colors from '../../styles/Colors';
import { UserItem } from '../../types/User';

interface ListProps {
    movieItem?: MovieItem;
    userItem?: UserItem;
}

const keyExtractor = (item: Review) => item._id;

const MyReviewList: React.FC<ListProps> = ({ movieItem, userItem }) => {

    const { user, userDetail } = useAuth();
    const abortController = new AbortController();
    const signal = abortController.signal;
    const [reviewData, setReviewData] = React.useState<Review[]>([]);

    React.useLayoutEffect(() => {

        const getReviewListByMovie = async () => {

            const url = `${API_URL}review/movie/${movieItem?._id}`;
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
                    setReviewData(result.data.reviews);
                }
            } catch (error) {
                if (error instanceof Error) {
                    if (error.name === 'AbortError') {

                    } else {

                    }
                } else {

                }
                throw error; // Re-throw the error to be handled by the caller if necessary
            }
        };

        const getReviewListByUser = async () => {

            const url = `${API_URL}review/user/${userItem?._id}`;
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
                    setReviewData(result.data.reviews);
                }
            } catch (error) {
                if (error instanceof Error) {
                    if (error.name === 'AbortError') {

                    } else {

                    }
                } else {

                }
                throw error;
            }
        };

        if (movieItem) {
            getReviewListByMovie();
        }

        if (userItem) {
            getReviewListByUser();
        }

        return () => {
            abortController.abort();
        };
    }, [movieItem, userItem]);

    return (
        <>
            {reviewData.length > 0 &&
                <FlatList
                    style={styles.container}
                    data={reviewData}
                    renderItem={({ item }) => <ReviewItem item={item} />}
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
