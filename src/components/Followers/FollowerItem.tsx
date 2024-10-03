// FollowerItem.tsx
import React from 'react';
import { View, Text, Pressable, StyleSheet, GestureResponderEvent, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Colors from '../../styles/Colors';
import CustomButton from '../Ui/CustomButton';
import Fonts from '../../styles/Fonts';
import { useAuth } from '../../context/AuthContext';
import { API_URL } from '../../configure/config.android';
import { Button, Dialog, Portal } from 'react-native-paper';
import { useAppDispatch } from '../../store/index';
import { createFollower,  removeFollower } from '../../store/slices/followerSlice';

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

type FollowerType = {
    _id: string;
    userId: string;
    followerId: User;
    followingId: User;
    createdAt: string;
    isFollowing: boolean;
    __v: number;
    //followerId: any;
};

interface FollowerItemProps {
    follower: FollowerType;
}

const FollowerItem: React.FC<FollowerItemProps> = ({ follower }) => {

    const { userDetail, user, appCounter } = useAuth();

    const [isDialog, setIsDialog] = React.useState(false);
    const [userId, setUserId] = React.useState(''); 
    const dispatch = useAppDispatch();
    

    const showUnfollowDialog = async (id: string) => {
        setIsDialog(true);
        setUserId(id);        
    };

    const showFollowDialog = async (id: string) => {
        setIsDialog(true); 
        setUserId(id); 
    };

    const hideDialog = () => setIsDialog(false);

    const followHandler = async () => {
        
        // console.log('userId', userId);
        // console.log('followerId', userDetail._id);
        const response = await dispatch(createFollower({ url: `${API_URL}follow`, token: user?.token!, userId: userId, followerId:userDetail._id }));          
        if(response.meta.requestStatus === 'fulfilled'){            
            setIsDialog(false);  
        }
    };

    const unFollowHandler = async () => {
        const followerId = userDetail._id; //logged in user id
        await dispatch(removeFollower({ url: `${API_URL}unfollow`, token: user?.token!, userId: userId, followerId:followerId }));  
    };


    return (
        <>            
            <View style={styles.mainWrapper}>
                <View style={styles.container}>
                    <View style={styles.user}>
                        <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.gradient}>
                            <Icon name={'user-circle'} size={30} color={Colors.whiteColor} />
                        </LinearGradient>
                    </View>                    
                    <Text style={styles.name}>{follower.followerId.firstname}</Text>
                </View>
                <View style={styles.rightWrapper}>
                    {follower.isFollowing &&
                        <>                            
                             <Pressable style={styles.button} onPress={showUnfollowDialog.bind(this, follower.followerId._id)}>
                                <Text style={styles.text}>Unfollow</Text>
                            </Pressable>

                        </>
                    }

                   {!follower.isFollowing &&
                        <Pressable style={styles.button} onPress={showFollowDialog.bind(this, follower.followerId?._id)}>
                            <Text style={styles.text}>Follow</Text>
                        </Pressable>
                    }

                </View>
            </View>

            <Portal>
            <Dialog visible={isDialog} onDismiss={hideDialog}>
                    <Dialog.Title>
                        {follower.isFollowing &&<Text style={styles.dialogueHeading}>Are you sure you want to unfollow this user?</Text>}
                        {!follower.isFollowing &&<Text style={styles.dialogueHeading}>Are you sure you want to follow this user?</Text>}
                    </Dialog.Title>
                <Dialog.Actions>
                    <Button onPress={hideDialog}>Cancel</Button>                     
                    {follower.isFollowing && <Button onPress={unFollowHandler}>Ok</Button>}
                    {!follower.isFollowing && <Button onPress={followHandler}>Ok</Button>}
                </Dialog.Actions>
            </Dialog>
            </Portal>

        </>
    );
};

const styles = StyleSheet.create({
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
        borderRadius: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        width: 100
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
    user: {
        width: 30
    },
    gradient: {
        borderRadius: 30
    },
});

export default React.memo(FollowerItem);
