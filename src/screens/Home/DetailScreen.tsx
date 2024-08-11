import React from 'react';
import { View, TextInput, Button, ScrollView, KeyboardAvoidingView, Alert, StyleSheet, Text, Keyboard } from 'react-native';

const DetailScreen: React.FC = () => {

    const [text, setText] = React.useState('');

    const handlePress = () => {
        Alert.alert('Button Pressed', `You entered: ${text}`);
    };

    const [keyboardStatus, setKeyboardStatus] = React.useState('');

    React.useEffect(() => {

        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => setKeyboardStatus('show'));
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => setKeyboardStatus('hide'));

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    return (
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={keyboardStatus === 'show' ? 50 : 0} style={styles.container}>
            <ScrollView automaticallyAdjustContentInsets={true}>
                <View style={styles.commentBox}><Text style={styles.text}>Hello</Text></View>
                <View style={styles.commentBox}><Text style={styles.text}>Hello</Text></View>
                <View style={styles.commentBox}><Text style={styles.text}>Hello</Text></View>
                <View style={styles.commentBox}><Text style={styles.text}>Hello</Text></View>
                <View style={styles.commentBox}><Text style={styles.text}>Hello</Text></View>
                <View style={styles.commentBox}><Text style={styles.text}>Hello</Text></View>
                <View style={styles.commentBox}><Text style={styles.text}>Hello</Text></View>
                <View style={styles.commentBox}><Text style={styles.text}>Hello</Text></View>
                <View style={styles.commentBox}><Text style={styles.text}>Hello</Text></View>
                <View style={styles.commentBox}><Text style={styles.text}>Hello</Text></View>
                <View style={styles.commentBox}><Text style={styles.text}>Hello</Text></View>
                <View style={styles.commentBox}><Text style={styles.text}>Hello</Text></View>
                <View style={styles.commentBox}><Text style={styles.text}>Hello</Text></View>
                <View style={styles.commentBox}><Text style={styles.text}>Hello</Text></View>
                <View style={styles.commentBox}><Text style={styles.text}>Hello</Text></View>
                <View style={styles.commentBox}><Text style={styles.text}>Hello</Text></View>
                <View style={styles.commentBox}><Text style={styles.text}>Hello</Text></View>
                <View style={styles.commentBox}><Text style={styles.text}>Hello</Text></View>
                <View style={styles.commentBox}><Text style={styles.text}>Hello</Text></View>
                <View style={styles.commentBox}><Text style={styles.text}>Hello</Text></View>
                <View>
                    <ScrollView>
                        <View style={styles.commentBox1}><Text style={styles.text}>Hello</Text></View>
                        <View style={styles.commentBox1}><Text style={styles.text}>Hello</Text></View>
                        <View style={styles.commentBox1}><Text style={styles.text}>Hello</Text></View>
                        <View style={styles.commentBox1}><Text style={styles.text}>Hello</Text></View>
                        <View style={styles.commentBox1}><Text style={styles.text}>Hello</Text></View>
                        <View style={styles.commentBox1}><Text style={styles.text}>Hello</Text></View>
                        <View style={styles.commentBox1}><Text style={styles.text}>Hello</Text></View>
                        <View style={styles.commentBox1}><Text style={styles.text}>Hello</Text></View>
                        <View style={styles.commentBox1}><Text style={styles.text}>Hello</Text></View>
                        <View style={styles.commentBox1}><Text style={styles.text}>Hello</Text></View>
                        <View style={styles.commentBox1}><Text style={styles.text}>Hello</Text></View>
                        <View style={styles.commentBox1}><Text style={styles.text}>Hello</Text></View>
                        <View style={styles.commentBox1}><Text style={styles.text}>Hello</Text></View>
                        <View style={styles.commentBox1}><Text style={styles.text}>Hello</Text></View>
                        <View style={styles.commentBox1}><Text style={styles.text}>Hello</Text></View>
                        <View style={styles.commentBox1}><Text style={styles.text}>Hello</Text></View>
                        <View style={styles.commentBox1}><Text style={styles.text}>Hello</Text></View>
                        <View style={styles.commentBox1}><Text style={styles.text}>Hello</Text></View>
                        <View style={styles.commentBox1}><Text style={styles.text}>Hello</Text></View>
                        <View style={styles.commentBox1}><Text style={styles.text}>Hello</Text></View>
                    </ScrollView>
                </View>
                <Text>{keyboardStatus}</Text>
                <View>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter some text"
                        value={text}
                        onChangeText={setText}
                    />
                    <Button title="Press Me" onPress={handlePress} />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
        flex: 1
    },
    commentBox: {
        marginBottom: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: 'brown'
    },
    commentBox1: {
        marginBottom: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: 'yellow'
    },
    input: {
        height: 100,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        color: '#fff'
    },
    text: {
        color: '#fff'
    }
});

export default DetailScreen;
