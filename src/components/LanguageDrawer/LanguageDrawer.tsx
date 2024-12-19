import * as React from 'react';
import {StyleSheet, View, Pressable, FlatList, Platform} from 'react-native';
import {Text, Checkbox} from 'react-native-paper';
import Colors from '../../styles/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import Fonts from '../../styles/Fonts';
import {LANGUAGES} from '../../utils/Data';
import FastImage from 'react-native-fast-image';

interface LanguageDrawerProps {
  visible?: boolean;
  onCancelHandler?: () => void;
  onApplyHandler?: (data: any) => void;
  getSelectedLanguage?: { [key: string]: boolean } | null;
}

type LangugaeCheckboxesProps = {
  languages: string[];
};

const LanguageDrawer: React.FC<LanguageDrawerProps> = ({visible,onCancelHandler,onApplyHandler, getSelectedLanguage}) => {

  const [selected, setSelected] = React.useState<Record<string, boolean>>({});
  const languages = [...LANGUAGES!];

  const toggleCheckbox = React.useCallback((language: string) => {
    setSelected(prevState => ({
      ...prevState,
      [language]: !prevState[language],
    }));
  }, []);

  const getSelectedDataHandler = React.useCallback(() => {
    onApplyHandler?.(selected);
  }, [onApplyHandler, selected]);

  const initialSelectedLanguages = React.useMemo(() => {
    return getSelectedLanguage || {};
  }, [getSelectedLanguage]);

  React.useEffect(() => {    
    setSelected(initialSelectedLanguages);
  }, [initialSelectedLanguages]);

  const renderItem = ({item: language}: {item: string}) => (
    <View style={styles.flatItem}>
      {Platform.OS === 'android' &&<Checkbox status={selected[language] ? 'checked' : 'unchecked'} onPress={() => toggleCheckbox(language)} />}
      {Platform.OS === 'ios' && (<>
        {selected[language] ? <FastImage style={{width:25, height:25}} source={require('../../assets/images/icons/checked.png')} /> : <FastImage style={{width:25, height:25}} source={require('../../assets/images/icons/unchecked.png')} />}
      </>)}
      <Text style={styles.checkboxLabel} onPress={() => toggleCheckbox(language)}>{language}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      
      <View style={styles.flatHeader}>
        <Text style={styles.flateHeaderText}>Filter by language</Text>
        {Platform.OS === 'android' && <Icon name={'close-circle'} size={40} color={Colors.tabActiveColor} onPress={onCancelHandler} />}
        <Pressable onPress={onCancelHandler}><FastImage style={{width:25, height:25}} source={require('../../assets/images/icons/close-y.png')} /></Pressable> 
      </View>

      <FlatList
        data={languages}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.flatListStyle}
        renderItem={renderItem}
      />

      <Pressable style={styles.flatFooter} onPress={getSelectedDataHandler}>
        <Text style={styles.footerText}>Apply</Text>
      </Pressable>
      
    </View>
  );
};

const styles = StyleSheet.create({
  flatFooter: {
    height: 50,
    minWidth: '100%',
    backgroundColor: Colors.tabActiveColor,
    alignItems: 'center',
    justifyContent: 'space-between',
    top: 0,
    right: 0,
    zIndex: 1,
    cursor: 'pointer',
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 10,    
    elevation: 5,
    borderBottomRightRadius:10,
    borderBottomLeftRadius:10
  },
  footerText: {
    fontFamily: Fonts.Family.Bold,
    color: Colors.blackColor,
  },
  flatHeader: {
    borderTopRightRadius:10,
    borderTopLeftRadius:10,
    backgroundColor: Colors.blackColor,
    alignItems: 'center',
    justifyContent: 'space-between',
    top: 0,
    right: 0,
    width: '100%',
    height: 60,
    zIndex: 1,
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.inputBackgroundColor,
    elevation: 5,
  },
  flateHeaderText: {
    color: Colors.whiteColor,
    fontFamily: Fonts.Family.Bold,
  },
  flatListStyle: {    
    borderRadius: 10,
  },
  checkboxLabel: {
    marginLeft: 5,
    fontSize: Fonts.Size.Medium,
    color: Colors.whiteColor,
  },
  flatItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.blackColor,
    paddingTop: 10,
    paddingLeft: 10    
  },
  container: {
    flex: 1, 
    minHeight:300,
    maxHeight:400, 
    backgroundColor:Colors.blackColor
  },
  flatList: {  
    backgroundColor: '#f1f1f1',
  },
  headerFooter: {
    backgroundColor: '#343a40',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  headerFooterText: {
    color: '#fff',
    fontSize: 18,
  },
  item: {
    backgroundColor: '#e9ecef',
    padding: 15,
    marginVertical: 8,
    borderRadius: 5,
  },
  title: {
    fontSize: 16,
  },
});

export default React.memo(LanguageDrawer);
