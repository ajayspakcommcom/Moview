import * as React from 'react';
import { StyleSheet, View} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { useSelector } from 'react-redux';
import { RootState } from '../../store/index';
import { MovieReviewResponse, ShowReviewResponse } from '../../models/MyReview';
import { useAuth } from '../../context/AuthContext';


const MyReviewList = React.lazy(() => import('../../components/MyReviewList/MyReviewList'));
const Loading = React.lazy(() => import('../../components/Loading/Loading'));

type Props = {
    navigation: any;
};

const HomeScreen: React.FC<Props> = ({navigation}) => {

    const { userDetail } = useAuth();

    const { data: moviewReviewsData } = useSelector((state: RootState) => state.myMovieReview);    
    const { data: showReviewsData } = useSelector((state: RootState) => state.myShowReview);

    const [moviewReviews, setMoviewReviews] = React.useState<MovieReviewResponse[]>([]);
    const [showReviews, setShowReviews] = React.useState<ShowReviewResponse[]>([]);

    const getMovieShowReview = React.useCallback(() => {             
        setMoviewReviews(moviewReviewsData);
        setShowReviews(showReviewsData);
    }, [moviewReviewsData, showReviewsData]); 

      useFocusEffect(
          React.useCallback(() => {                            
              getMovieShowReview();
            return () => {};
        }, [getMovieShowReview]) 
    );

    return (              
            <View style={styles.container}>                
                <React.Suspense fallback={<Loading />}>
                    <MyReviewList userItem={userDetail} isUser={false} movies={moviewReviews} shows={showReviews} />
                </React.Suspense>
            </View>        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 15
    }
});

export default HomeScreen;
