// FollowerItem.tsx
import React from 'react';
import { View,  Image, StyleSheet, Pressable, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Colors from '../../styles/Colors';
import CustomButton from '../Ui/CustomButton';
import { useAuth } from '../../context/AuthContext';
import Fonts from '../../styles/Fonts';
import { API_URL } from '../../configure/config.ios';
import { Button, Dialog, Portal, Text } from 'react-native-paper';
import { useAppDispatch } from '../../store/index';
import { createFollower,  removeFollower } from '../../store/slices/followerSlice';
import FastImage from 'react-native-fast-image';


type User = {
    _id: string;
    firstname: string;
    username: string;
    email: string;
    phone: string;
    password_hash: string;
    is_deleted: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    __v: number;
};

type FollowingType = {
    _id: string;
    userId: string;
    followingId: User;
    followerId: User;
    createdAt: string;
    __v: number;
};
interface FollowingItemProps {
    following: FollowingType;
}

const FollowingItem: React.FC<FollowingItemProps> = ({ following }) => {

    const { user, userDetail, counter } = useAuth();
    const [isDialog, setIsDialog] = React.useState(false);
    const [userId, setUserId] = React.useState('');
    const dispatch = useAppDispatch();

    const showDialog = async (id: string) => {
        setUserId(id);        
        setIsDialog(true);
    };

    const hideDialog = () => setIsDialog(false);


    const unFollowHandler = async () => {
        const followerId = userDetail._id; //logged in user id
        const resp = await dispatch(removeFollower({ url: `${API_URL}unfollow`, token: user?.token!, userId: userId, followerId: followerId }));          
        console.log('resp', resp);
    };

    React.useLayoutEffect(() => {
        return () => {};
    }, [counter]);


    return (
        <>  
            
           
            <View style={styles.mainWrapper}>
                <View style={styles.container}>
                    <View style={styles.user}>
                        {/* <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.gradient}>
                            <Icon name={'user-circle'} size={30} color={Colors.whiteColor} />
                        </LinearGradient> */}
                        <View style={styles.user}><FastImage style={styles.icon} source={require('../../assets/images/icons/profile-y.png')} /></View>
                    </View>
                    <Text style={styles.name}>{following.followingId.firstname}</Text>
                </View>
                <View style={styles.rightWrapper}>                    
                    {/* <Pressable style={styles.button} onPress={showDialog.bind(this, following.followingId?._id)}>
                        <Text style={styles.text}>Unfollow</Text>
                    </Pressable> */}

                    <Pressable style={styles.button} onPress={showDialog.bind(this, following.followingId?._id)}>
                        <Text style={styles.text}>Unfollow</Text>
                    </Pressable>

                    

                </View>
            </View>

            <Portal>
            <Dialog visible={isDialog} onDismiss={hideDialog}>
                <Dialog.Title><Text style={styles.dialogueHeading}>Are you sure you want to unfollow this user?</Text></Dialog.Title>
                <Dialog.Actions>
                    <Button onPress={hideDialog}>Cancel</Button>
                    <Button onPress={unFollowHandler}>Ok</Button>
                </Dialog.Actions>
            </Dialog>
            </Portal>
        </>
    );
};

const styles = StyleSheet.create({
    icon: {
        width: 25,
        height: 25
    },
    user: {
        alignItems:'center',
        justifyContent:'center',
        width: 50,
        height:50, 
        backgroundColor:Colors.whiteColor, 
        borderRadius:50
    },
    dialogueHeading: {
        fontSize:Fonts.Size.Medium,
        fontFamily: Fonts.Family.Bold,
        lineHeight: 20
    },
    button: {
        display: 'flex',
        paddingVertical: 10,
        height: 40,
        backgroundColor: Colors.tabActiveColor,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        width: 100,
    },
    text: {
        fontSize: Fonts.Size.Medium - 1,
        color: Colors.blackColor,
        fontFamily: Fonts.Family.Bold
    },
    mainWrapper: {
        flex: 1,
        paddingVertical: 20,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: Colors.borderColor,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btnStyle: {
        paddingHorizontal: 15,
        height: 'auto',
        paddingVertical: 5
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    rightWrapper: {
        justifyContent: 'center'
    },
    profilePicture: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    name: {
        fontSize: 16,
        color: Colors.whiteColor,
        paddingLeft: 10
    },
    gradient: {
        borderRadius: 30
    },
});

export default React.memo(FollowingItem);
