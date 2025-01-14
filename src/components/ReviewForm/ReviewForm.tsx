import React from 'react';
import { View, StyleSheet, TextInput, Alert, KeyboardAvoidingView, Text } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';
import CustomButton from '../Ui/CustomButton';
import { MovieItem } from '../../types/Movie';
import { useAuth } from '../../context/AuthContext';
import { API_URL } from '../../configure/config.ios';
import { useAppDispatch } from '../../store/index';
import { createReviewListByMovie } from '../../store/slices/reviewListByMoviewSlice';
import { Button, Dialog, Portal } from 'react-native-paper';
import { createNotification } from '../../store/slices/notificationSlice';

import { fetchReviewsByUserId as fetchMovieReviewsByUserId } from '../../store/slices/myMovieReviewSlice';
import { Filter } from 'bad-words'



interface ItemProps {
    movieItem?: MovieItem,
    onPress?: (bool: string) => void;
}

const ReviewForm: React.FC<ItemProps> = ({ movieItem, onPress }) => {

    const { userDetail, user } = useAuth();
    const [comment, setComment] = React.useState<string>('');
    const [rating, setRating] = React.useState<number>(0);
    const [loader, setLoader] = React.useState(false);
    const [totalCount, setTotalCount] = React.useState(5);
    const filter = new Filter();


    const [isDialog, setIsDialog] = React.useState(false);
    const dispatch = useAppDispatch();

    const hideDialog = () => {
        onPress && onPress('reviews');
        setIsDialog(false);
        dispatch(createNotification({ url: `${API_URL}notification`, token: user?.token!, user_id: userDetail._id, title: userDetail.firstname, message: comment, type: 'movie', movie_show_id: movieItem._id }));
    };

    React.useLayoutEffect(() => {

        return () => {

        };
    }, [movieItem?._id]);

    const ratingCompleted = (rating: number) => {
        setRating(rating);
    }

    const handleCommentChange = (text: string) => {
        setComment(text);
    };


    const onSaveHandler = async () => {

        const containsProfanity = filter.isProfane(comment);

        if (rating > 0 && comment.length > 0) {

            if (containsProfanity) {
                Alert.alert('Warning', 'Your review contains language that violates our community guidelines. Please remove any inappropriate content and resubmit your review.');
                return;
            } else {
                const createdReview = await dispatch(createReviewListByMovie({ url: `${API_URL}review`, token: user?.token!, movie: movieItem._id, user: userDetail._id, rating, comment }));
                if (createdReview.meta.requestStatus === 'fulfilled') {
                    setIsDialog(true);
                    const movieUrl = `${API_URL}review/user/${userDetail._id}`;
                    await dispatch(fetchMovieReviewsByUserId({ url: movieUrl, token: user?.token! }));
                } else {
                    Alert.alert('Error', 'Failed to create review.');
                }
            }

        } else {
            Alert.alert('', 'Rating and Comments are required');
        }
    };

    return (
        <>
            <View style={styles.editableRating}>
                <View style={styles.editableRatingInnerWrapper}>
                    <AirbnbRating
                        count={totalCount}
                        reviews={["Bad", "Meh", "OK", "Good", "Jesus"]}
                        defaultRating={0}
                        size={25}
                        showRating={false}
                        onFinishRating={ratingCompleted}
                        selectedColor={Colors.tabActiveColor}
                    />
                    <View style={styles.countRatingWrapper}>
                        <Text style={styles.ratingText}>{rating}</Text>
                        <Text style={styles.ratingSlash}>/</Text>
                        <Text style={styles.totalRatingText}>{totalCount}</Text>
                    </View>
                </View>
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

            <Portal>
                <Dialog visible={isDialog} onDismiss={hideDialog}>
                    <Dialog.Title>
                        <Text>Review created successfully</Text>
                    </Dialog.Title>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>Ok</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>

        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    editableRating: {
        flexDirection: 'row',
        // justifyContent: 'center'
        paddingLeft:15
    },
    editableRatingInnerWrapper: {
        width: 200,
        // paddingTop: 25,
        position: 'relative',
        flexDirection: 'row',

    },
    countRatingWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginLeft: 5
    },
    ratingText: {
        color: Colors.whiteColor,
        fontSize: Fonts.Size.Medium + 5,
        fontWeight: '600'
    },
    ratingSlash: {
        color: Colors.whiteColor,
        marginHorizontal: 2
    },
    totalRatingText: {
        color: Colors.tabBgColor,
        fontSize: Fonts.Size.Small,
        fontWeight: '500'
    },
    formWrapper: {
        marginTop: 20,
        paddingHorizontal: 15,
        marginBottom: 15
    },
    textInput: {
        backgroundColor: Colors.playPauseButtonColor,
        width: '100%',
        height: 250,
        paddingHorizontal: 10,
        fontSize: Fonts.Size.Medium,
        textAlignVertical: 'top',
        color: Colors.whiteColor,
        marginBottom: 15
    }
});

export default React.memo(ReviewForm);
