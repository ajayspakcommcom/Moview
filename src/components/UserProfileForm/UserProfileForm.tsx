import * as React from 'react';
import { View, Text, StyleSheet, GestureResponderEvent, Alert } from 'react-native';
import Colors from '../../styles/Colors';
import { API_URL } from '../../configure/config.android';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useAuth } from '../../context/AuthContext';
import { TextInput } from 'react-native-paper';

const CustomTextInput = React.lazy(() => import('../../components/Ui/CustomTextInput'));
const CustomButton = React.lazy(() => import('../../components/Ui/CustomButton'));
const CustomTextTextarea = React.lazy(() => import('../Ui/CustomTextTextarea'));


type Props = {
    onCancel: (bool: boolean) => void;
};

const UserProfileForm: React.FC<Props> = ({ onCancel }) => {

    const { userDetail, user, updateUserDetail } = useAuth();

    const [firstname, setFirstname] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [biography, setBiography] = React.useState('');

    const [loader, setLoader] = React.useState(false);
    


    React.useLayoutEffect(() => {

        setFirstname(userDetail.firstname);
        setUsername(userDetail.username);
        setPhone(userDetail.phone);
        setPassword(userDetail.password_hash);
        setBiography(userDetail.biography);

        return () => {}

    }, []);

    const editHandler = async () => {

        try {

            const fields = [
                { name: 'First name', value: firstname },
                { name: 'Username', value: username },
                { name: 'Password', value: password },
                { name: 'Phone', value: phone },
                { name: 'Biography', value: biography }
            ];

            const emptyField = fields.find(field => field.value.trim() === '');

            if (emptyField) {
                Alert.alert('Error', `${emptyField.name} is required`);
                return;
            } else {

                try {
                    setLoader(true);
                    const response = await fetch(`${API_URL}user/${userDetail._id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${user?.token}`
                        },
                        body: JSON.stringify({
                            "firstname": firstname,
                            "username": username,
                            "phone": phone,
                            "password": password,
                            "biography": biography
                        }),
                    });

                    const result = await response.json();


                    if (result.status === 'success') {
                        setLoader(false);
                        updateUserDetail(result.data.user)
                        Alert.alert('Profile Updated Successfully', '', [
                            {
                                text: 'OK', onPress: () => {
                                    onCancel(false);
                                }
                            },
                        ]);
                    } else {
                        Alert.alert('Error', `${result.message}`, [
                            { text: 'OK', onPress: () => { } }
                        ]);
                    }
                } catch (error) {

                }
            }

        } catch (error) {
            console.error('Login error:', error);
            Alert.alert('Error', 'Login failed. Please try again.');
        }
    };

    const handleFirstnameChange = (text: string) => {
        setFirstname(text);
    };

    const handleUsernameChange = (text: string) => {
        setUsername(text);
    };

    const handlePhoneChange = (text: string) => {
        setPhone(text);
    };

    const handlePasswordChange = (text: string) => {
        setPassword(text);
    };

    const handleBioChange = (text: string) => {
        setBiography(text);
    };

    const cancelHandler = () => {
        onCancel(false);
    };

    return (
        <View style={styles.container}>

            <View style={styles.userIcon}>
                <Icon name={'user-alt'} size={45} color={Colors.tabBgColor} onPress={() => { }} style={styles.icon} />
            </View>

            <CustomTextInput
                placeholder="First name"
                value={firstname}
                onChangeText={handleFirstnameChange}
                autoCapitalize="none"
            />

            <CustomTextInput
                placeholder="Username"
                value={username}
                onChangeText={handleUsernameChange}
                autoCapitalize="none"
                editable={false}
            />

            <CustomTextInput
                placeholder="Mobile"
                value={phone}
                onChangeText={handlePhoneChange}
                editable={true}
            />

            <CustomTextInput
                placeholder="Password"
                value={password}
                onChangeText={handlePasswordChange}
                secureTextEntry
                editable={true}
            />


           

            <CustomTextTextarea
                style={styles.textArea}
                placeholder="Write something about your self..."
                multiline={true}
                numberOfLines={4}
                value={biography}
                onChangeText={handleBioChange}
            />

            <CustomButton
                text={loader ? "Updating..." : "Update"}
                onPressHandler={editHandler}
                textSize={20}
                isDisabled={loader ? true : false}
            />

            <CustomButton
                text={"Cancel"}
                onPressHandler={cancelHandler}
                textSize={20}
                isDisabled={loader ? true : false}
                style={{ ...styles.cancelBtn }}
                textStyle={{ ...styles.cancelText }}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: '15%'
    },
    textArea: {
        height: 100,
        justifyContent: "flex-start",
        textAlignVertical: "top", // Ensures text starts at the top of the TextInput
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
    },
    userIcon: {
        backgroundColor: Colors.whiteColor,
        width: 80,
        height: 80,
        borderRadius: 80,
        justifyContent: 'center',
        marginBottom: 15
    },
    icon: {
        textAlign: 'center'
    },
    cancelBtn: {
        backgroundColor: Colors.dullRedColor,
        marginTop: 15
    },
    cancelText: {
        color: Colors.whiteColor
    },
    logo: {
        width: 166,
        height: 118,
        marginBottom: 60,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: 'blue',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    }

});


export default React.memo(UserProfileForm);
