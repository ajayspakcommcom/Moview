import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Checkbox } from 'react-native-paper';

interface LanguageSelectorProps {
  languages: string[]; // Array of language strings
  selected: Record<string, boolean>; // Object mapping language to selected state
  toggleCheckbox: (language: string) => void; // Function to toggle checkbox state
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ languages, selected, toggleCheckbox }) => {
  const renderItem = ({ item: language }: { item: string }) => (
    <View style={styles.checkboxWrapper}>
      <Checkbox
        status={selected[language] ? 'checked' : 'unchecked'}
        onPress={() => toggleCheckbox(language)}
      />
      <Text style={styles.checkboxLabel} onPress={() => toggleCheckbox(language)}>
        {language}
      </Text>
    </View>
  );

  return (
    <FlatList
      data={languages} // Array of languages
      keyExtractor={(item, index) => index.toString()} // Unique key for each item
      renderItem={renderItem} // Render each item using the renderItem function
      contentContainerStyle={styles.listContainer} // Optional: styles for FlatList container
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
  },
  checkboxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default React.memo(LanguageSelector);
