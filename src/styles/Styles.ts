import { StyleSheet } from 'react-native';
import Colors from './Colors';
import Fonts from './Fonts';

const Styles = StyleSheet.create({

    rootContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: Colors.chineseBlack
    },

    titleText: {
        fontFamily: 'Cochin',
        fontSize: 20,
        fontWeight: 'bold',
    },

    paragraph: {
        fontSize: 30,
        marginVertical: 8,
        fontFamily: Fonts.Medium
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
    },

    errorText: {
        color: 'crimson',
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 6,
        textAlign: 'center',
    }
});

export default Styles;