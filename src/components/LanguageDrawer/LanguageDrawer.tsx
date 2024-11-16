import * as React from 'react';
import {StyleSheet, View, ScrollView, Pressable, Dimensions} from 'react-native';
import { Drawer, Text, Checkbox } from 'react-native-paper';
import Colors from '../../styles/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import Fonts from '../../styles/Fonts';
import { LANGUAGES } from '../../utils/Data';
import {createPadding} from '../../styles/Common';

interface LanguageDrawerProps {
  visible?: boolean;
  onCancelHandler?: () => void;
  onApplyHandler?:(data:any) => void;
}

type LanguageCheckboxesProps = {
  languages: string[]; 
};

const LanguageDrawer: React.FC<LanguageDrawerProps> = ({visible,onCancelHandler, onApplyHandler}) => {

  const [selected, setSelected] = React.useState<Record<string, boolean>>({}); 
  const languages = [...LANGUAGES!];

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
    <View style={[styles.drawerWrapperOpened]}>
      <View style={[styles.drawerContentWrapper]}>
        <View style={styles.closeWrapperBtn}>
          <Text style={styles.closeBtnText}>Select Language</Text>
          <Icon name={'close-circle'} size={40} color={Colors.tabActiveColor} onPress={onCancelHandler} />
        </View>
        <ScrollView>
          <Drawer.Section>
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
    left: '50%',
    height: '50%',
    top: '50%',
    width: 300,
    transform: [{ translateX: -150 }, { translateY: -50 }],
    borderRadius: 5,
    overflow:'hidden'
  },
  closeWrapperBtn: {
    backgroundColor:Colors.blackColor,
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 0,
    right: 0,
    width: '100%',
    height: 60,
    zIndex: 1,
    cursor: 'pointer',
    display:'flex',
    flexDirection:'row',   
    paddingTop:10, 
    paddingBottom:10, 
    paddingRight:10,
    paddingLeft:10,
    borderBottomWidth:1,
    borderBottomColor:Colors.inputBackgroundColor,
    elevation:5    
  },

  closeBtnText: {
    color: Colors.whiteColor,
    fontFamily:Fonts.Family.Bold
  },

  drawerContentWrapper: {
    backgroundColor: Colors.whiteColor,
    width: '100%',
    minHeight: '50%',
    overflow: 'scroll',
    paddingTop: 15,
    paddingBottom: 40,
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
    color:Colors.whiteColor
  },  
  checkboxWrapper: {
    display: 'flex',
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:Colors.blackColor
  }
});
