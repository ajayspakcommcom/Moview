import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Portal, Dialog, Button, Text, List } from 'react-native-paper';
import Fonts from '../../styles/Fonts';


interface AlertDialogProps {
    visible: boolean;
    cancelLogout: () => void;
    signOut: () => void;
    title?: string;
    content?: string;
    isContent?: boolean
}

const AlertDialog: React.FC<AlertDialogProps> = ({
    visible,
    cancelLogout,
    signOut,
    title = "Alert",
    content = "This is a simple dialog",
    isContent= false
}) => {

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={cancelLogout}>
                {title && <Dialog.Title style={styles.title}>{title}</Dialog.Title>}
                {(content && isContent) && <Dialog.Content>
                    <Text style={styles.deleteKTHeading}>By deleting your account, you acknowledge that:</Text>
                    <View style={styles.info}>
                        <Text style={styles.feature}>1) All your reviews, follows, and notifications will be permanently removed.</Text>
                        <Text style={styles.feature}>2) Any interactions with other users, including your reviews and follow activities, will no longer be accessible.</Text>
                        <Text style={styles.feature}>3) This action is irreversible, and all your data will be permanently deleted from our system.</Text>
                    </View>
                    <Text style={styles.deleteKTHeading}>If you wish to proceed, please confirm your account deletion.</Text>
                </Dialog.Content>}
                <Dialog.Actions>
                    <Button onPress={cancelLogout} mode='outlined' style={[styles.btn]}>No</Button>
                    <Button onPress={signOut} mode='contained' style={[styles.btn]}>Yes</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

export default React.memo(AlertDialog);

const styles = StyleSheet.create({
    btn: {
        width:100, 
        borderRadius:5
    },
    title: {
        fontSize: 18,
        fontWeight: '800'
    },
    deleteKTHeading: {
        fontSize: Fonts.Size.Small + 1,
        fontFamily: Fonts.Family.Bold,
        marginBottom: 15,
        fontWeight: '600'
    },
    info: {

    },
    feature: {
        fontFamily: Fonts.Family.Thin,
        fontSize: Fonts.Size.Small,
        marginBottom: 15
    }
});
