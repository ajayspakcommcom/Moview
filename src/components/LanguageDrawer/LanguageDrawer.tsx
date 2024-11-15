import * as React from 'react';
import {StyleSheet, View, ScrollView, Pressable} from 'react-native';
import {Button, Drawer, Text, Checkbox } from 'react-native-paper';
import Colors from '../../styles/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import Fonts from '../../styles/Fonts';
import { LANGUAGES } from '../../utils/Data';

interface LanguageDrawerProps {
  visible?: boolean;
  onCancelHandler?: () => void;
  onApplyHandler?:(data:any) => void;
}

type LanguageCheckboxesProps = {
  languages: string[]; // Prop to accept an array of languages
};

const LanguageDrawer: React.FC<LanguageDrawerProps> = ({visible,onCancelHandler, onApplyHandler}) => {

  const [selected, setSelected] = React.useState<Record<string, boolean>>({}); 
  const languages = [...LANGUAGES];

  const toggleCheckbox = (language: string) => {    
    setSelected((prevState) => ({      
      ...prevState,
      [language]: !prevState[language], 
    }));    
  };


  const getSelectedDataHandler = () => {
      onApplyHandler?.(selected);
  };
  

  return (
    <View style={[styles.drawerWrapperOpened, !visible && styles.drawerWrapperClosed]}>
      <View style={[styles.drawerContentWrapper]}>
        <View style={styles.closeWrapperBtn}>
          <Icon name={'close-circle'} size={40} color={Colors.redColor} onPress={onCancelHandler} />
        </View>

        <ScrollView>
          <Drawer.Section title="Select Langauage">
          {languages.map((language, index) => (
              <View key={index} style={styles.checkboxWrapper}>
                <Checkbox status={selected[language] ? 'checked' : 'unchecked'} onPress={() => toggleCheckbox(language)} />
                <Text style={styles.checkboxLabel} onPress={() => toggleCheckbox(language)}>{language}</Text>
              </View>
          ))}
          </Drawer.Section>
        </ScrollView>
        <View style={styles.footerWrapper}>
          <View style={[styles.footerWrapperInside, styles.footerWrapperInsideRightBorder]}>
            <Pressable style={styles.footerWrapper} onPress={onCancelHandler}><Text style={styles.footerText}>Cancel</Text></Pressable>
          </View>
          <View style={styles.footerWrapperInside}>
            <Pressable style={styles.footerWrapper} onPress={getSelectedDataHandler}><Text style={styles.footerText}>Apply</Text></Pressable>
          </View>           
        </View>
      </View>
    </View>
  );
};

export default React.memo(LanguageDrawer);

const styles = StyleSheet.create({
  drawerWrapperOpened: {
    position: 'absolute',
    zIndex: 1,
    backgroundColor: Colors.backgroundColorShadow,
    left: '0%',
    height: '100%',
    top: 0,
    width: '100%',
  },
  closeWrapperBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 10,
    right: 15,
    width: 45,
    height: 45,
    zIndex: 1,
    cursor: 'pointer',
  },
  drawerWrapperClosed: {
    left: '-100%',
  },
  drawerContentWrapper: {
    backgroundColor: Colors.whiteColor,
    width: '70%',
    minHeight: '100%',
    overflow: 'scroll',
    paddingTop: 15,
    paddingBottom: 45,
  },
  footerWrapper: {
    height: 50,
    width: '100%',
    backgroundColor: Colors.blackColor,
    position: 'absolute',
    left: 0,
    bottom: 0,
    display:'flex',
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth:1,
    borderTopColor: Colors.whiteColor    
  },
  footerWrapperInside: {
    backgroundColor:Colors.inputBackgroundColor, 
    width:'50%',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    minHeight:50    
  }, 
  footerWrapperInsideRightBorder: {
    borderRightWidth:1,
    borderRightColor: Colors.whiteColor
  },
  footerText: {
    fontFamily:Fonts.Family.Bold,
    color:Colors.whiteColor
  },
  checkboxLabel: {
    marginLeft: 5,  
    fontSize: Fonts.Size.Medium,   
  },
  checkboxWrapper: {
    display: 'flex',
    flexDirection:'row',
    alignItems:'center'
  }
});
