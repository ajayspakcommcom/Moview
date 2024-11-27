import * as React from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl, LayoutChangeEvent, Pressable } from 'react-native';
import { useNavigation, ParamListBase, NavigationProp } from '@react-navigation/native';
import Colors from '../../styles/Colors';
import { MovieItem } from '../../types/Movie';
import Fonts from '../../styles/Fonts';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useAuth } from '../../context/AuthContext';
import { Notification } from '../../types/Notification';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { API_URL } from '../../configure/config.android';

type Props = {
    notificationData: Notification[];
    onClick?: (id: string) => void;
};

const movieList: MovieItem[] = [];

const MyNotification: React.FC<Props> = ({notificationData, onClick}) => {

    const { user } = useAuth();
    
    const flatListRef = React.useRef<FlatList<any>>(null);
    const [refreshing, setRefreshing] = React.useState(false);
    const [data, setData] = React.useState<Notification[]>([]);
    const navigation: NavigationProp<ParamListBase> = useNavigation();

    React.useLayoutEffect(() => {
        setData(notificationData);
        return () => { };
    }, [notificationData]);

    const onRefresh = () => {
        
    };

    const onClose = async (obj: Notification) => {        
        onClick && onClick(obj._id);
    }

    const styles = StyleSheet.create({
        flatListWrapper: {
            paddingTop: 15,
            padding: 20,
        },
        actionWrapper: {
            width: 30,
            height: 30,
            position: 'absolute',            
            right: 10,
            zIndex: 999,
            alignItems: 'center',
            justifyContent: 'center',                       
        },
        type: {
            backgroundColor: Colors.tabActiveColor,
            width: 25,
            height: 25,
            borderRadius: 50,
            position: 'absolute',
            top: 10,
            right: 0,
            zIndex: 10,
            alignItems: 'center',
            justifyContent: 'center'
        },
        typeText: {
            color: Colors.whiteColor,
            fontFamily: Fonts.Family.Light,
            fontSize: Fonts.Size.Small,
            textTransform: 'uppercase'
        },
        item: {
            width: '100%',
            position: 'relative',
            flexDirection: 'row',
            marginBottom: 15,
            backgroundColor: Colors.reviewBgColor,
            alignItems: 'center',
            borderRadius: 5,
        },
        userIcon: {            
            paddingVertical: 5,
            paddingHorizontal: 10,
            width: '15%'        
        },
        headingWrapper: {
            paddingVertical: 10,
            width: '85%',            
            position:'relative',
            zIndex:0            
        },
        heading: {
            color: Colors.whiteColor,
            fontFamily: Fonts.Family.Bold,
            fontSize: Fonts.Size.Medium,
            textTransform: 'uppercase'
        },
        desc: {
            color: Colors.whiteColor,
            fontFamily: Fonts.Family.Medium,
            width: 'auto'
        },
        testWrapper: {
            backgroundColor: 'pink',
            paddingVertical: 10,
            height: 300,
            paddingHorizontal: 50
        },
    });


    const gotoDetailHandler = async (notification:Notification) => {
        let movieShow = notification.type.toLowerCase();
        const response = await fetch(`${API_URL}${movieShow}/${notification.movie_show_id}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json','Authorization': `Bearer ${user?.token}`}            
        });
        const resp = await response.json();
        const destination = movieShow === 'movie' ? 'DetailScreen' : 'ShowDetail';
        const data = movieShow === 'movie' ? { movie: resp.data.movie } : { showItem: resp.data.show };        
        navigation.navigate(destination, data);
    };
    

    const renderItem = ({ item }: { item: Notification }) => (                
            <View style={[styles.item]}>

                <View style={styles.actionWrapper}>
                    <AntDesign name={'close'} size={30} color={Colors.tabActiveColor} onPress={onClose.bind(null, item)} />
                </View>

                <View style={styles.userIcon}>
                    <Pressable onPress={gotoDetailHandler.bind(null, item)}>
                        <Icon name={'user-circle'} size={30} color={Colors.whiteColor} />
                    </Pressable>
                </View>

                <View style={[styles.headingWrapper]} >
                    <Text style={styles.heading} onPress={gotoDetailHandler.bind(null, item)}>{item.title}</Text>
                    <Text style={styles.desc} onPress={gotoDetailHandler.bind(null, item)}>{item.message}</Text>
                </View>

            </View>        
    );
    
    return (
            <FlatList
                ref={flatListRef}
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                style={styles.flatListWrapper}
                horizontal={false}
                refreshControl={<RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={[Colors.blackColor, Colors.darkBackgroudColor, Colors.playPauseButtonColor]}
                    progressBackgroundColor={Colors.tabActiveColor}
                />}
                extraData={movieList}
            />        
    );
};


export default React.memo(MyNotification);
