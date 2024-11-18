import * as React from 'react';
import {StyleSheet, View, Pressable, FlatList} from 'react-native';
import {Text, Checkbox} from 'react-native-paper';
import Colors from '../../styles/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import Fonts from '../../styles/Fonts';
import {LANGUAGES} from '../../utils/Data';

interface LanguageDrawerProps {
  visible?: boolean;
  onCancelHandler?: () => void;
  onApplyHandler?: (data: any) => void;
}

type LangugaeCheckboxesProps = {
  languages: string[];
};

const LanguageDrawer: React.FC<LanguageDrawerProps> = ({
  visible,
  onCancelHandler,
  onApplyHandler,
}) => {
  const [selected, setSelected] = React.useState<Record<string, boolean>>({});
  const languages = [...LANGUAGES!];

  const toggleCheckbox = (language: string) => {
    setSelected(prevState => ({
      ...prevState,
      [language]: !prevState[language],
    }));
  };

  const getSelectedDataHandler = async () => {
    onApplyHandler?.(selected);
  };

  const renderItem = ({item: language}: {item: string}) => (
    <View style={styles.flatItem}>
      <Checkbox
        status={selected[language] ? 'checked' : 'unchecked'}
        onPress={() => toggleCheckbox(language)}
      />
      <Text
        style={styles.checkboxLabel}
        onPress={() => toggleCheckbox(language)}>
        {language}
      </Text>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.flatHeader}>
      <Text style={styles.flateHeaderText}>Filter by language</Text>
      <Icon
        name={'close-circle'}
        size={40}
        color={Colors.tabActiveColor}
        onPress={onCancelHandler}
      />
    </View>
  );

  const renderFooter = () => (
    <Pressable style={styles.flatFooter} onPress={getSelectedDataHandler}>
      <Text style={styles.footerText}>Apply</Text>
    </Pressable>
  );

  return (
    <View>
      <View style={styles.flatHeader}>
        <Text style={styles.flateHeaderText}>Filter by language</Text>
        <Icon
          name={'close-circle'}
          size={40}
          color={Colors.tabActiveColor}
          onPress={onCancelHandler}
        />
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
  flatListStyle: {
    width: 300,
    borderRadius: 10,
  },
  flatHeader: {
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
  flatFooter: {
    height: 50,
    width: '100%',
    backgroundColor: Colors.tabActiveColor,
    left: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    fontFamily: Fonts.Family.Bold,
    color: Colors.whiteColor,
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
    paddingLeft: 10,
  },
});

export default React.memo(LanguageDrawer);
