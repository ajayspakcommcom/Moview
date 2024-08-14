import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useAuth } from '../../context/AuthContext';

const MyReviewList = React.lazy(() => import('../../components/MyReviewList/MyReviewList'));
const Loading = React.lazy(() => import('../../components/Loading/Loading'));

type Props = {

};

const HomeScreen: React.FC<Props> = () => {

    const { userDetail } = useAuth();

    React.useLayoutEffect(() => {

        return () => {

        }
    }, []);


    return (
        <>
            <View style={styles.container}>
                <React.Suspense fallback={<Loading />}>
                    <MyReviewList userItem={userDetail} isUser={false} />
                </React.Suspense>
            </View>
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
