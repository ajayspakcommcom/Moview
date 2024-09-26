import React from 'react';
import { View, StyleSheet } from 'react-native';
import { API_URL } from '../../configure/config.android';
import { Text } from 'react-native-paper';
import { Button } from 'react-native-paper';

import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store/index';
import { createReviewListByMovie, fetchReviewListByMovie } from '../../store/slices/reviewListByMoviewSlice';
import { useAuth } from '../../context/AuthContext';



const TestScreen = () => {

    const { user } = useAuth();

     const { data: reviewListDataByMovie } = useSelector((state: RootState) => state.reviewListByMovie);  
    const dispatch = useAppDispatch();


    const showConsole = (message: string) => {

        //dispatch(fetchReviewListByMovie({ url: `${API_URL}review/movie/66a2074a519ff3d289917c02`, token: user?.token! }));  
        dispatch(createReviewListByMovie({ url: `${API_URL}review`, token: user?.token!, movie: '66a2074a519ff3d289917c02', user: '66a367ee470675a3aa79ccb3', rating: 5, comment: 'api sujeet' }));       

        console.log(message);
    };

    React.useEffect(() => {
        dispatch(fetchReviewListByMovie({ url: `${API_URL}review/movie/66a2074a519ff3d289917c02`, token: user?.token! }));  
    }, []);

    return (
        <View style={styles.container}>
            <Text style={{ color: 'white' }}>{JSON.stringify(reviewListDataByMovie)}</Text>
           <Button onPress={() => showConsole('button pressed')}>Button</Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#021526'
    }
});

export default TestScreen;
