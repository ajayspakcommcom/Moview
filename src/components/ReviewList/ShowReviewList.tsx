import React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import ShowReviewItem from './ShowReviewItem';
import { Review } from '../../models/Review';
import { API_URL } from '../../configure/config.android';
import { useAuth } from '../../context/AuthContext';
import { ShowItem } from '../../types/Show';
import Colors from '../../styles/Colors';
import { UserItem } from '../../types/User';

interface ListProps {
    showItem?: ShowItem;
    userItem?: UserItem;
}

const keyExtractor = (item: Review) => item._id;

const ShowReviewList: React.FC<ListProps> = ({ showItem, userItem }) => {

    const { user, userDetail } = useAuth();
    const abortController = new AbortController();
    const signal = abortController.signal;
    const [reviewData, setReviewData] = React.useState<Review[]>([]);

    React.useLayoutEffect(() => {

        const getReviewListByShow = async () => {

            const url = `${API_URL}review-show/show/${showItem?._id}`;
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

                console.log('Result', result);

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

        if (showItem) {
            getReviewListByShow();
        }

        if (userItem) {
            getReviewListByUser();
        }

        return () => {
            abortController.abort();
        };
    }, [showItem, userItem]);

    return (
        <>
            {reviewData.length > 0 &&
                <FlatList
                    style={styles.container}
                    data={reviewData}
                    renderItem={({ item }) => <ShowReviewItem item={item} />}
                    keyExtractor={keyExtractor}
                    contentContainerStyle={styles.container}
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

export default React.memo(ShowReviewList);
