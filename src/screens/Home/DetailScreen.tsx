import * as React from 'react';
import { View, Text, StyleSheet, Button, ScrollView, ImageSourcePropType, Image, TextInput } from 'react-native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { useRoute, useNavigation, ParamListBase, NavigationProp, RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../styles/Colors';
import { MovieItem } from '../../types/Movie';
import { findMovieById } from '../../utils/Common';
import { MovieDataList } from '../../utils/Data';
import Fonts from '../../styles/Fonts';
import { Rating, AirbnbRating } from 'react-native-ratings';
import CustomButton from '../../components/Ui/CustomButton';


type Props = {

};

const movieList: MovieItem[] = [...MovieDataList];

const DetailScreen: React.FC<Props> = () => {

    const navigation: NavigationProp<ParamListBase> = useNavigation();
    const route: RouteProp<{ params: { id: string } }> = useRoute();
    const [detailData, setDetailData] = React.useState<Partial<MovieItem>>({});

    const [comment, setComment] = React.useState<string>('');
    const [rating, setRating] = React.useState<number>(0);


    React.useLayoutEffect(() => {

        console.log(route);

        const movie = findMovieById(movieList, route.params.id);

        setDetailData(prevState => ({
            ...prevState,
            id: movie?.id,
            title: movie?.title,
            image: movie?.image,
            videoUrl: movie?.videoUrl
        }));


        const backButtonHandler = () => {
            navigation.navigate('HomeScreen');
        };

        const gotoNotification = () => {
            console.log('Notification...');
        };

        navigation.setOptions({
            title: `${movie?.title}`,
            headerLeft: () => {
                return <Icon name={'chevron-back'} size={30} color={Colors.whiteColor} onPress={backButtonHandler} />
            },
            headerRight: () => {
                return <Icon name={'notifications'} size={25} color={Colors.tabActiveColor} onPress={gotoNotification} />
            }
        });

        return console.log('');
    }, []);

    const ratingCompleted = (rating: number) => {
        setRating(rating);
    }

    const onSaveHandler = () => {
        console.log('Ram');
        console.log(rating)
        console.log(comment);
        navigation.navigate('Notification');
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                {detailData.image && <Image source={detailData.image} style={styles.img} />}
            </View>

            <View style={styles.detailText}>
                <Text style={styles.detailHeading}>Black Panther</Text>
                <View style={styles.ratingWrapper}>
                    <AirbnbRating
                        count={5}
                        reviews={["Bad", "Meh", "OK", "Good", "Jesus"]}
                        defaultRating={3}
                        size={25}
                        showRating={false}
                        isDisabled={true}
                    />
                </View>
            </View>

            <View style={styles.genreWrapper}>
                <View style={styles.genreItem}><Text style={styles.genreText}>Action</Text></View>
                <View style={styles.genreItem}><Text style={styles.genreText}>Adventures</Text></View>
                <View style={styles.genreItem}><Text style={styles.genreText}>Sic-Fi</Text></View>
            </View>

            <View style={styles.releaseWrapper}>
                <View style={styles.releaseItem}><Text style={styles.releaseText}>Release date: 14 February 2018</Text></View>
            </View>

            <View style={styles.directorWrapper}>
                <View style={styles.directorItem}><Text style={styles.directorText}>Director: Ryan Coogler</Text></View>
            </View>

            <View style={styles.editableRating}>
                <AirbnbRating
                    count={5}
                    reviews={["Bad", "Meh", "OK", "Good", "Jesus"]}
                    defaultRating={3}
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
                    onChangeText={setComment}
                    value={comment}
                />
                <CustomButton
                    text="Submit"
                    onPressHandler={onSaveHandler}
                    textSize={20}
                    style={{ backgroundColor: Colors.playPauseButtonColor }}
                />
            </View>

        </ScrollView>
    );
};


const styles = StyleSheet.create({

    container: {
        flex: 1
    },
    header: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 15
    },
    img: {
        width: '100%',
        height: 300,
        resizeMode: 'cover'
    },
    detailText: {
        paddingVertical: 15,
        paddingHorizontal: 15
    },
    detailHeading: {
        color: Colors.whiteColor,
        fontFamily: Fonts.Family.Bold,
        fontSize: Fonts.Size.Medium + 4,
        textTransform: 'uppercase'
    },
    ratingWrapper: {
        paddingVertical: 5,
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    genreWrapper: {
        flexDirection: 'row',
        paddingHorizontal: 15
    },
    genreItem: {
        marginRight: 15,
        paddingVertical: 2,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: Colors.whiteColor,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    genreText: {
        color: Colors.whiteColor,
        fontFamily: Fonts.Family.Medium
    },
    releaseWrapper: {
        marginTop: 10,
        paddingHorizontal: 15,
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    releaseItem: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    releaseText: {
        color: Colors.whiteColor,
        fontFamily: Fonts.Family.Medium
    },
    directorWrapper: {
        marginTop: 10,
        paddingHorizontal: 15,
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    directorItem: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    directorText: {
        color: Colors.whiteColor,
        fontFamily: Fonts.Family.Medium
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


export default DetailScreen;
