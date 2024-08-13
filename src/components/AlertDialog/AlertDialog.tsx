import React from 'react';
import { StyleSheet } from 'react-native';
import { Portal, Dialog, Button, Text } from 'react-native-paper';

interface AlertDialogProps {
    visible: boolean;
    cancelLogout: () => void;
    signOut: () => void;
    title?: string;
    content?: string;
}

const AlertDialog: React.FC<AlertDialogProps> = ({
    visible,
    cancelLogout,
    signOut,
    title = "Alert",
    content = "This is a simple dialog",
}) => {
    return (
        <Portal>
            <Dialog visible={visible} onDismiss={cancelLogout}>
                <Dialog.Title style={styles.title}>{title}</Dialog.Title>
                <Dialog.Actions>
                    <Button onPress={cancelLogout}>No</Button>
                    <Button onPress={signOut}>Yes</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

export default React.memo(AlertDialog);

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: '800'
    }
});
