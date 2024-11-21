import * as React from 'react';
import { StyleSheet, View, Text, Pressable} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/index';
import { MovieReviewResponse, ShowReviewResponse } from '../../models/MyReview';
import { useAuth } from '../../context/AuthContext';
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';



const MyReviewList = React.lazy(() => import('../../components/MyReviewList/MyReviewList'));
const Loading = React.lazy(() => import('../../components/Loading/Loading'));

type Props = {
    navigation: any;
};

const HomeScreen: React.FC<Props> = ({navigation}) => {

    const { userDetail, logout } = useAuth();
    

    const { data: moviewReviewsData } = useSelector((state: RootState) => state.myMovieReview);    
    const { data: showReviewsData } = useSelector((state: RootState) => state.myShowReview);

    const [moviewReviews, setMoviewReviews] = React.useState<MovieReviewResponse[]>([]);
    const [showReviews, setShowReviews] = React.useState<ShowReviewResponse[]>([]);

    const getMovieShowReview = React.useCallback(() => {
        
        if(userDetail.role === 'guest') {
            setMoviewReviews([]);
            setShowReviews([]);
        } else {            
            setMoviewReviews(moviewReviewsData);
            setShowReviews(showReviewsData);
        }
        
        
    }, [moviewReviewsData, showReviewsData]); 

      useFocusEffect(
          React.useCallback(() => {                            
              getMovieShowReview();
            return () => {};
        }, [getMovieShowReview]) 
    );

    const navigationHandler = () => {
        logout();
    };

    return (              
            <View style={styles.container}>                
                {userDetail.role !== 'guest' && 
                    <React.Suspense fallback={<Loading />}>
                         <MyReviewList userItem={userDetail} isUser={false} movies={moviewReviews} shows={showReviews} />
                    </React.Suspense>
                }

                {userDetail.role === 'guest' && 
                    <View style={styles.withoutLoginWrapper}>
                        <Pressable style={styles.pressableBtn} onPress={navigationHandler}>
                            <Text style={styles.pressableText}>Please Login</Text>
                        </Pressable>
                    </View>
                }
            </View>        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 15
    }, 
    withoutLoginWrapper: {
        flex: 1,        
        justifyContent:'center', 
        alignItems:'center'
    }, 
    pressableBtn: {
        
    }, 
    pressableText: {
        color:Colors.whiteColor, 
        fontFamily:Fonts.Family.Bold, 
        fontSize:Fonts.Size.Medium + 2        
    }
});

export default HomeScreen;
