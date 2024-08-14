import * as React from 'react';
import { View, Text, StyleSheet, GestureResponderEvent, Alert, Pressable } from 'react-native';
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';
import { StackNavigationProp } from '@react-navigation/stack';
import { API_URL } from '../../configure/config.android';
import FastImage from 'react-native-fast-image';
import { hitSlops } from '../../utils/Common';
import Icon from 'react-native-vector-icons/FontAwesome5';

const CustomTextInput = React.lazy(() => import('../../components/Ui/CustomTextInput'));
const CustomButton = React.lazy(() => import('../../components/Ui/CustomButton'));


type Props = {
    onCancel: (bool: boolean) => void;
};

const UserProfileForm: React.FC<Props> = ({ onCancel }) => {

    const [firstname, setFirstname] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [loader, setLoader] = React.useState(false);

    const editHandler = async () => {

        try {

            const fields = [
                { name: 'First name', value: firstname },
                { name: 'Username', value: username },
                { name: 'Password', value: password },
                { name: 'Phone', value: phone }
            ];

            const emptyField = fields.find(field => field.value.trim() === '');

            if (emptyField) {
                Alert.alert('Error', `${emptyField.name} is required`);
                return;
            } else {

                try {
                    setLoader(true);
                    const response = await fetch(`${API_URL}user`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            "firstname": firstname,
                            "username": username,
                            "email": username,
                            "phone": phone,
                            "password": password
                        }),
                    });

                    const result = await response.json();


                    if (result.status === 'success') {
                        setLoader(false);
                        Alert.alert('Registration Successfully', 'Thank you for your registration. We will contact you soon.', [
                            {
                                text: 'OK', onPress: () => {
                                    setFirstname('');
                                    setUsername('');
                                    setPassword('');
                                    setPhone('');
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

    const skipHandler = (event: GestureResponderEvent) => {

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
                placeholder="Phone"
                value={phone}
                onChangeText={handlePhoneChange}
            />

            <CustomTextInput
                placeholder="Password"
                value={password}
                onChangeText={handlePasswordChange}
                secureTextEntry
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
        paddingTop: '25%'
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
