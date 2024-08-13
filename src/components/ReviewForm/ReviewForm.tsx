import React from 'react';
import { View, StyleSheet, TextInput, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';
import CustomButton from '../Ui/CustomButton';
import { MovieItem } from '../../types/Movie';
import { useAuth } from '../../context/AuthContext';
import { API_URL } from '../../configure/config.android';

interface ItemProps {
    movieItem: MovieItem
}

const ReviewForm: React.FC<ItemProps> = ({ movieItem }) => {

    const { userDetail, user } = useAuth();
    const [comment, setComment] = React.useState<string>('');
    const [rating, setRating] = React.useState<number>(0);
    const [loader, setLoader] = React.useState(false);

    React.useLayoutEffect(() => {
        return () => {

        };
    }, [movieItem._id]);

    const ratingCompleted = (rating: number) => {
        setRating(rating);
    }

    const handleCommentChange = (text: string) => {
        setComment(text);
    };


    const onSaveHandler = async () => {
        try {

            if (rating === 0) {
                Alert.alert('Error', 'Please give a rate.');
                return;
            }

            if (comment.trim() === '') {
                Alert.alert('Error', 'Please provide a review.');
                return;
            }

            try {
                setLoader(true);
                const response = await fetch(`${API_URL}review`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user?.token}`,
                    },
                    body: JSON.stringify({
                        "movie": movieItem._id,
                        "user": userDetail._id,
                        "rating": rating,
                        "review_text": comment,
                    }),
                });

                const result = await response.json();

                if (result.status === 'success') {

                    try {
                        const response = await fetch(`${API_URL}notification`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${user?.token}`,
                            },
                            body: JSON.stringify({
                                "user_id": userDetail._id,
                                "title": userDetail.firstname,
                                "message": comment,
                                "type": "review"
                            }),
                        });
                    } catch (error) {
                        //
                    }

                    setLoader(false);
                    Alert.alert('Review Successfully', 'Thank you for your review.', [
                        {
                            text: 'OK', onPress: () => {
                                setComment('');
                                setRating(0);
                            }
                        },
                    ]);
                } else {
                    Alert.alert('Error', `${result.message}`, [
                        { text: 'OK', onPress: () => { } }
                    ]);
                }


            } catch (error) {
                console.error('Error submitting review:', error);
                Alert.alert(`Error: ${error}`);
                throw error;
            }


        } catch (error) {
            console.error('error:', error);
            Alert.alert('Error', 'Error');
        }

    };


    return (
        <>
            <View style={styles.editableRating}>
                <AirbnbRating
                    count={5}
                    reviews={["Bad", "Meh", "OK", "Good", "Jesus"]}
                    defaultRating={0}
                    size={25}
                    showRating={false}
                    onFinishRating={ratingCompleted}
                />
            </View>

            <View style={styles.formWrapper}>
                <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                    <TextInput
                        style={styles.textInput}
                        multiline={true}
                        numberOfLines={10}
                        placeholder="Type Here..."
                        onChangeText={handleCommentChange}
                        value={comment}
                        inputMode={'text'}
                    />
                </KeyboardAvoidingView>
                <CustomButton
                    text={loader ? "Submit..." : "Submit"}
                    onPressHandler={onSaveHandler}
                    textSize={20}
                    style={{ backgroundColor: Colors.tabActiveColor }}
                    isDisabled={loader ? true : false}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red'
    },
    editableRating: {
        width: '100%',
        paddingTop: 25
    },
    formWrapper: {
        marginTop: 20,
        paddingHorizontal: 15,
        marginBottom: 15
    },
    textInput: {
        backgroundColor: Colors.playPauseButtonColor,
        width: '100%',
        height: 120,
        paddingHorizontal: 10,
        fontSize: Fonts.Size.Medium,
        textAlignVertical: 'top',
        color: Colors.whiteColor,
        marginBottom: 15
    }
});

export default React.memo(ReviewForm);
