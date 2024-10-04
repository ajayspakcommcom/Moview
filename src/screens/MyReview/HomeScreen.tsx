import * as React from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { useAuth } from '../../context/AuthContext';
import { useFocusEffect } from '@react-navigation/native';

import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store/index';
import { API_URL } from '../../configure/config.android';

const MyReviewList = React.lazy(() => import('../../components/MyReviewList/MyReviewList'));
const Loading = React.lazy(() => import('../../components/Loading/Loading'));

import { fetchReviewsByUserId as fetchMovieReviewsByUserId } from '../../store/slices/myMovieReviewSlice';
import { fetchReviewsByUserId as fetchShowReviewsByUserId } from '../../store/slices/myShowReviewSlice';


type Props = {
    navigation: any;
};

const HomeScreen: React.FC<Props> = ({navigation}) => {

    const { userDetail, user } = useAuth();
    
    const { data: moviewReviews } = useSelector((state: RootState) => state.myMovieReview);    
    const { data: showReviews } = useSelector((state: RootState) => state.myShowReview);


    const dispatch = useAppDispatch();

    const setMovieShowReview = async () => {
        const movieUrl = `${API_URL}review/user/${userDetail._id}`;
        const showUrl = `${API_URL}review-show/user/${userDetail._id}`;
        dispatch(fetchMovieReviewsByUserId({ url: movieUrl, token: user?.token! }));
        dispatch(fetchShowReviewsByUserId({ url: showUrl, token: user?.token! }));
    };

    const getMovieShowReview = async () => {
        console.log('state value', moviewReviews);
        const movieUrl = `${API_URL}review/user/${userDetail._id}`;
        const respMovieReview = await dispatch(fetchMovieReviewsByUserId({ url: movieUrl, token: user?.token! }));
        console.log('respMovieReview', respMovieReview);
    };
 
      useFocusEffect(
          React.useCallback(() => {
              console.log('moviewReviews useCallback');
            return () => {            
            };
        }, []) 
    );

    return (
        <>   
        
            <Button onPress={getMovieShowReview}>Pressed</Button>
            
            {/* <View style={styles.container}>                
                <React.Suspense fallback={<Loading />}>
                    <MyReviewList userItem={userDetail} isUser={false} movies={moviewReviews} shows={showReviews} />
                </React.Suspense>
            </View> */}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 15
    }
});

export default HomeScreen;
