import React from 'react';
import { View, StyleSheet, TextInput, Alert, KeyboardAvoidingView, Text, Pressable, Linking } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';
import CustomButton from '../Ui/CustomButton';
import { ShowItem } from '../../types/Show';
import { useAuth } from '../../context/AuthContext';
import { API_URL } from '../../configure/config.ios';
import { useAppDispatch } from '../../store';
import { createReviewListByShow } from '../../store/slices/reviewListByShowSlice';
import { createNotification } from '../../store/slices/notificationSlice';
import { Button, Dialog, Portal } from 'react-native-paper';

import { fetchReviewsByUserId as fetchMovieReviewsByUserId } from '../../store/slices/myMovieReviewSlice';
import { fetchReviewsByUserId as fetchShowReviewsByUserId } from '../../store/slices/myShowReviewSlice';
import { Filter } from 'bad-words'

interface ItemProps {
    showItem: ShowItem,
    onPress?: (bool: string) => void;
}

const ShowReviewForm: React.FC<ItemProps> = ({ showItem, onPress }) => {

    const { userDetail, user, appCounter } = useAuth();
    const [comment, setComment] = React.useState<string>('');
    const [rating, setRating] = React.useState<number>(0);
    const [loader, setLoader] = React.useState(false);
    const [totalCount, setTotalCount] = React.useState(5);
    const [isThannkYou, setIsThankYou] = React.useState(false);

    const filter = new Filter();

    const dispatch = useAppDispatch();

    const ratingCompleted = (rating: number) => {
        setRating(rating);
    }

    const handleCommentChange = (text: string) => {
        setComment(text);
    };

    const hideDialog = () => {
        dispatch(createNotification({ url: `${API_URL}notification`, token: user?.token!, user_id: userDetail._id, title: userDetail.firstname, message: comment, type: 'show', movie_show_id: showItem._id }));
    };

    const setMovieShowReview = async () => {
        const movieUrl = `${API_URL}review/user/${userDetail._id}`;
        const showUrl = `${API_URL}review-show/user/${userDetail._id}`;
        dispatch(fetchMovieReviewsByUserId({ url: movieUrl, token: user?.token! }));
        dispatch(fetchShowReviewsByUserId({ url: showUrl, token: user?.token! }));
    };

    const onSaveHandler = async () => {
        const containsProfanity = filter.isProfane(comment);
        if (rating > 0 && comment.length > 0) {

            if (containsProfanity) {
                Alert.alert('Warning', 'Your review contains language that violates our community guidelines. Please remove any inappropriate content and resubmit your review.');
                return;
            } else {
                const createdReview = await dispatch(createReviewListByShow({ url: `${API_URL}review-show`, token: user?.token!, show: showItem._id, user: userDetail._id, rating, comment }));
                if (createdReview.meta.requestStatus === 'fulfilled') {
                    setIsThankYou(true);
                    setTimeout(() => {
                        setIsThankYou(false);
                        hideDialog();
                    }, 5000);
                    setMovieShowReview();
                } else {
                    Alert.alert('Error', 'Failed to create review.');
                }
            }
        } else {
            Alert.alert('', 'Rating and Comments are required');
        }
    };

    const termsConditionHandler = React.useCallback(async (url: string) => {

        try {
            const canOpen = await Linking.canOpenURL(url);
            if (!canOpen) {
                Alert.alert('Error', 'Unable to open the privacy policy page. Please try again later.', [{ text: 'OK' }]);
                return;
            }

            await Linking.openURL(url);

        } catch (err) {
            console.error('Error opening privacy policy:', err);
            Alert.alert(
                'Error',
                'Could not open the page. Please check your internet connection and try again.',
                [
                    {
                        text: 'Try Again',
                    },
                    {
                        text: 'Cancel',
                        style: 'cancel'
                    }
                ]
            );
        } finally {
            console.log('');
        }
    }, []);

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
                        placeholder="Write your review"
                        onChangeText={handleCommentChange}
                        value={comment}
                        inputMode={'text'}
                        placeholderTextColor={Colors.whiteColor}
                    />
                </KeyboardAvoidingView>
                <CustomButton
                    text={loader ? "Submit..." : "Submit"}
                    onPressHandler={onSaveHandler}
                    textSize={20}
                    style={{ backgroundColor: Colors.tabActiveColor }}
                    isDisabled={loader ? true : false}
                />

                <View style={styles.termWrapper}>
                    <Text style={styles.termText}>
                        I agree to the
                        <Pressable onPress={() => termsConditionHandler('https://moviu.in/terms-of-use.html')}><Text style={styles.linkText}>Condition of Use.</Text></Pressable>
                        The data I'm submitting is true and not copyrighted by a third party.</Text>
                </View>

                {isThannkYou && <View style={styles.thankYouWrapper}>
                    <Text style={styles.thankText}>Thank you for your review!</Text>
                </View>}

            </View>
        </>
    );
};

const styles = StyleSheet.create({
    thankYouWrapper: {        
        minHeight:200,
        justifyContent:'center'
    },
    thankText: {
        fontSize:Fonts.Size.Medium + 5,
        textAlign:'center',
        color:Colors.whiteColor,
        fontWeight:'600'
    },
    linkText: {
        textDecorationLine: 'underline',
        color: Colors.blueColor,
        paddingHorizontal:5,         
    },
    termWrapper: {        
        paddingVertical:10
    },
    termText: {
        color:Colors.whiteColor,
        textAlign:'center'
    },
    container: {
        flex: 1,
    },
    editableRating: {
        flexDirection: 'row',        
        paddingLeft:15
    },
    editableRatingInnerWrapper: {
        width: 200,
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

export default React.memo(ShowReviewForm);
