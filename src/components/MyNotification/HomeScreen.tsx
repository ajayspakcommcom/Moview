import * as React from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl, LayoutChangeEvent } from 'react-native';
import Colors from '../../styles/Colors';
import { MovieItem } from '../../types/Movie';
import Fonts from '../../styles/Fonts';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useAuth } from '../../context/AuthContext';
import { Notification } from '../../types/Notification';
import AntDesign from 'react-native-vector-icons/AntDesign';

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

    React.useLayoutEffect(() => {
        console.log('');
        console.log('');
        console.log('');
        console.log('');
        console.log('notificationData', notificationData[0]);
        setData(notificationData);
        return () => { };
    }, [notificationData]);

    const onRefresh = () => {
        
    };

    const onClose = async (obj: any) => {
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
            zIndex: 10,
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
            paddingRight: 15,
            paddingVertical: 5,
            paddingHorizontal: 10,
            width: '15%'        
        },
        headingWrapper: {
            paddingVertical: 10,
            width: '85%'            
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
    

    const renderItem = ({ item }: { item: Notification }) => (                
            <View style={[styles.item]}>

                <View style={styles.actionWrapper}>
                    <AntDesign name={'close'} size={30} color={Colors.tabActiveColor} onPress={onClose.bind(null, item)} />
                </View>

                <View style={styles.userIcon}>
                    <Icon name={'user-circle'} size={30} color={Colors.whiteColor} />
                </View>

                <View style={[styles.headingWrapper]}>
                    <Text style={styles.heading}>{item.title}</Text>
                    <Text style={styles.desc}>{item.message}</Text>
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
