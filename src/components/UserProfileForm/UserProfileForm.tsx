import * as React from 'react';
import { View, Text, StyleSheet, Alert, Platform, Pressable, } from 'react-native';
import Colors from '../../styles/Colors';
import { API_URL } from '../../configure/config.android';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useAuth } from '../../context/AuthContext';
import { Button, Dialog, Portal, TextInput } from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import Fonts from '../../styles/Fonts';
import AlertDialog from '../AlertDialog/AlertDialog';

const CustomTextInput = React.lazy(
  () => import('../../components/Ui/CustomTextInput'),
);
const CustomButton = React.lazy(
  () => import('../../components/Ui/CustomButton'),
);
const CustomTextTextarea = React.lazy(() => import('../Ui/CustomTextTextarea'));

type Props = {
  onCancel?: (bool: boolean) => void;
};

const UserProfileForm: React.FC<Props> = ({ onCancel }) => {


  const [dialogVisible, setDialogVisible] = React.useState<boolean>(false);
  const { userDetail, user, updateUserDetail, logout } = useAuth();

  const [firstname, setFirstname] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [biography, setBiography] = React.useState('');

  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const [loader, setLoader] = React.useState(false);

  React.useLayoutEffect(() => {
    setFirstname(userDetail.firstname);
    setUsername(userDetail.username);
    setPhone(userDetail.phone);
    //setPassword(userDetail.password_hash);
    setPassword('12345');
    setBiography(userDetail.biography);

    return () => { };
  }, []);

  const editHandler = async () => {
    try {
      const fields = [
        { name: 'First name', value: firstname },
        { name: 'Username', value: username },
        { name: 'Password', value: password },
        { name: 'Phone', value: phone },
        { name: 'Biography', value: biography },
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
              Authorization: `Bearer ${user?.token}`,
            },
            body: JSON.stringify({
              firstname: firstname,
              username: username,
              phone: phone,
              password: password,
              biography: biography,
            }),
          });

          const result = await response.json();

          if (result.status === 'success') {
            setLoader(false);
            updateUserDetail(result.data.user);
            Alert.alert('Profile Updated Successfully', '', [
              {
                text: 'OK',
                onPress: () => {
                  onCancel(false);
                },
              },
            ]);
          } else {
            Alert.alert('Error', `${result.message}`, [
              { text: 'OK', onPress: () => { } },
            ]);
          }
        } catch (error) { }
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
    const isVisible = text.length >= 100 ? true : false;
    setVisible(isVisible);
    setBiography(text);
  };

  const cancelHandler = () => {
    onCancel(false);
  };

  const openDeleteHandler = () => {
    setDialogVisible(true);
  };

  const deleteHandler = async () => {

    const abortController = new AbortController();
    const signal = abortController.signal;

    const url = `${API_URL}user/${userDetail._id}`;
    const token = user?.token;
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        signal: signal
      });
      const resData = await response.json();

      if (resData.status === 'success') {
        setDialogVisible(false);
        logout();
      }

    } catch (error) {
      console.log('error', error);
    }

  };

  return (
    <>

      <AlertDialog visible={dialogVisible} signOut={deleteHandler} cancelLogout={() => setDialogVisible(false)} title={'Are you sure want to delete this account?'} />

      <View style={styles.container}>
        <View style={styles.userIcon}>
          {Platform.OS === 'android' && <Icon
            name={'user-alt'}
            size={45}
            color={Colors.tabBgColor}
            onPress={() => { }}
            style={styles.icon}
          />}

          <FastImage style={styles.icon} source={require('../../assets/images/icons/profile-y.png')} />

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
          maxLength={100}
        />

        <CustomButton
          text={loader ? 'Updating...' : 'Update'}
          onPressHandler={editHandler}
          textSize={20}
          isDisabled={loader ? true : false}
        />

        <CustomButton
          text={'Cancel'}
          onPressHandler={cancelHandler}
          textSize={20}
          isDisabled={loader ? true : false}
          style={{ ...styles.cancelBtn }}
          textStyle={{ ...styles.cancelText }}
        />

        <Pressable style={styles.deleteTextWrapper} onPress={openDeleteHandler}>
          <Text style={styles.deleteText}>Delete Account</Text>
        </Pressable>

        <View style={styles.logoWrapper}>
          <FastImage style={styles.logoImg} source={require('../../assets/images/small-logo.png')} resizeMode={FastImage.resizeMode.contain} />
          <Text style={styles.honest}>Honest Movie Reviews</Text>
        </View>

      </View>

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Content>
            <Text variant="bodyMedium" style={[styles.alertText]}>Maximum 100 characters allowed.</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

    </>
  );
};

const styles = StyleSheet.create({
  deleteTextWrapper: {
    width: '100%',
    color: Colors.whiteColor,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingRight: 15
  },
  deleteText: {
    color: Colors.whiteColor,
    fontSize: Fonts.Size.Small - 3,
    textDecorationLine: 'underline',
    marginBottom: 10
  },
  honest: {
    fontFamily: Fonts.Family.Medium,
    fontSize: Fonts.Size.Small - 2,
    color: Colors.whiteColor,
  },
  logoImg: {
    width: 122,
    height: 50
  },
  logoWrapper: {
    alignItems: 'center'
  },
  icon: {
    width: 25,
    height: 25,
    textAlign: 'center',
  },
  alertText: {
    color: Colors.blackColor
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: '5%',
  },
  textArea: {
    height: 100,
    justifyContent: 'flex-start',
    textAlignVertical: 'top', // Ensures text starts at the top of the TextInput
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
    marginBottom: 15,
    alignItems: 'center'
  },
  cancelBtn: {
    backgroundColor: Colors.darkBackgroudColor, //Colors.dullRedColor,
    marginTop: 15,
    borderWidth: 2,
    borderColor: Colors.tabActiveColor,
    color: Colors.tabActiveColor,
    marginBottom: 20,
  },
  cancelText: {
    color: Colors.whiteColor,
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
  },
});

export default React.memo(UserProfileForm);
