import React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import ReviewItem from './ReviewItem';
import { Review } from '../../models/Review';
import { API_URL } from '../../configure/config.android';
import { useAuth } from '../../context/AuthContext';
import { MovieItem } from '../../types/Movie';
import Colors from '../../styles/Colors';

interface ListProps {
    movieItem?: MovieItem;
}

const keyExtractor = (item: Review) => item._id;

const desc = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`;

const data: any[] = [
    { _id: '1', name: 'Ajay Vishwakarma', rating: 4, award: 'gold', description: desc },
    { _id: '2', name: 'Omkar Sawant', rating: 3, award: 'silver', description: desc }
];


const ReviewList: React.FC<ListProps> = ({ movieItem }) => {

    const { user, userDetail } = useAuth();
    const abortController = new AbortController();
    const signal = abortController.signal;
    const [reviewData, setReviewData] = React.useState<Review[]>([]);

    React.useLayoutEffect(() => {

        const getReviewList = async () => {

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
                console.log(result);

                if (result.status === 'success') {
                    setReviewData(result.data.reviews);
                }
            } catch (error) {
                if (error instanceof Error) {
                    if (error.name === 'AbortError') {
                        console.log('Fetch aborted');
                    } else {
                        console.error('Error fetching movies:', error);
                    }
                } else {
                    console.error('Unknown error', error);
                }
                throw error; // Re-throw the error to be handled by the caller if necessary
            }
        };

        if (movieItem) {
            getReviewList();
        }


        return () => {
            abortController.abort();
        };
    }, [movieItem]);

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

export default React.memo(ReviewList);
