import * as React from 'react';
import { StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from '../../context/AuthContext';
import { API_URL } from '../../configure/config.android';
import { UserItem } from '../../types/User';

const FollowerFollowing = React.lazy(() => import('../../components/FollowerFollowing/FollowerFollowing'));
const Loading = React.lazy(() => import('../../components/Loading/Loading'));

type Props = {
    navigation: StackNavigationProp<any>;
    route: any;
};

const FollowerFollowingScreen: React.FC<Props> = ({ navigation, route }) => {

    const userId = route.params.userId;
    const abortController = new AbortController();
    const signal = abortController.signal;
    const [userDetail, setUserDetail] = React.useState<UserItem>();
    const { user } = useAuth();

    React.useLayoutEffect(() => {

        console.log('userId', userId);

        navigation.setOptions({title: ``});

        const fetchUserDetail = async () => {

            const url = `${API_URL}user/${userId}`;
            const token = user;

            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token?.token}`,
                        'Content-Type': 'application/json'
                    },
                    signal: signal
                });

                const respData = await response.json();

                if (respData.status === 'success') {
                    setUserDetail(respData.data.user)
                }
            } catch (error) {
                if (error instanceof Error) {
                    if (error.name === 'AbortError') {

                    } else {

                    }
                } else {

                }
                throw error; //Re-throw the error to be handled by the caller if necessary
            }
        };

        fetchUserDetail();

        return () => {
            abortController.abort();
        };
    }, []);

    return (
        <>
            <React.Suspense fallback={<Loading />}>
                <FollowerFollowing userData={userDetail} />
            </React.Suspense>
        </>
    );
};


const styles = StyleSheet.create({
});


export default FollowerFollowingScreen;
