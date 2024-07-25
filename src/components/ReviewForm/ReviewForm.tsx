import React from 'react';
import { View, StyleSheet, TextInput, Alert } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';
import CustomButton from '../Ui/CustomButton';
import { MovieItem } from '../../types/Movie';
import { useAuth } from '../../context/AuthContext';

interface ItemProps {
    movieItem: MovieItem
}

const ReviewForm: React.FC<ItemProps> = ({ movieItem }) => {

    const { userDetail } = useAuth();
    const [comment, setComment] = React.useState<string>('');
    const [rating, setRating] = React.useState<number>(0);

    React.useLayoutEffect(() => {
        return () => console.log('');
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

            console.log('userDetail', userDetail._id);
            console.log('comment', comment);
            console.log('rating', rating);
            console.log('movieItem', movieItem._id);




            ///await login(username, password);
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
                    size={35}
                    showRating={false}
                    onFinishRating={ratingCompleted}
                />
            </View>

            <View style={styles.formWrapper}>
                <TextInput
                    style={styles.textInput}
                    multiline={true}
                    numberOfLines={10}
                    placeholder="Type Here..."
                    onChangeText={handleCommentChange}
                    value={comment}
                />
                <CustomButton
                    text="Submit"
                    onPressHandler={onSaveHandler}
                    textSize={20}
                    style={{ backgroundColor: Colors.playPauseButtonColor }}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
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

export default ReviewForm;
