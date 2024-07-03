import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView, Keyboard, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { Review } from '../../models/Common';
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';
import { truncateText } from '../../utils/Common';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../Ui/CustomButton';

interface ItemProps {

}

const ReviewForm: React.FC<ItemProps> = () => {

    const [comment, setComment] = React.useState<string>('');
    const [rating, setRating] = React.useState<number>(0);

    const ratingCompleted = (rating: number) => {
        setRating(rating);
    }

    const handleCommentChange = (text: string) => {
        setComment(text);
    };


    const onSaveHandler = () => {
        console.log('rating', rating)
        console.log('comment', comment);
    };

    React.useLayoutEffect(() => {

        return () => {

        };
    }, []);

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
