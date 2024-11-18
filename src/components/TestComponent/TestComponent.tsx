import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import {Text, Checkbox} from 'react-native-paper';
import {LANGUAGES} from '../../utils/Data';
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';




const TestComponent : React.FC = () => {

  const [selected, setSelected] = React.useState<Record<string, boolean>>({});

  const languages = [...LANGUAGES!];

  React.useLayoutEffect(() => {

    setSelected({"bengali": true, "marathi": true, "telugu": true});

    return () => console.log('');
  }, []);


  const toggleCheckbox = (language: string) => {
    console.log('language', language);
    setSelected(prevState => ({
      ...prevState,
      [language]: !prevState[language],
    }));
  };

  const renderItem = ({item: language}: {item: string}) => (
    <View style={styles.flatItem}>
      <Checkbox status={selected[language] ? 'checked' : 'unchecked'} onPress={() => toggleCheckbox(language)} />
      <Text style={styles.checkboxLabel} onPress={() => toggleCheckbox(language)}>{language}</Text>
    </View>
  );

  

  return (
    <View style={styles.container}>
       <FlatList
        data={languages}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.flatListStyle}
        renderItem={renderItem}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'pink'
  },
  flatItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.blackColor,
    paddingTop: 10,
    paddingLeft: 10,
  },
  checkboxLabel: {
    marginLeft: 5,
    fontSize: Fonts.Size.Medium,
    color: Colors.whiteColor,
  },
  flatListStyle: {    
    borderRadius: 10,
  },
});

export default TestComponent;
