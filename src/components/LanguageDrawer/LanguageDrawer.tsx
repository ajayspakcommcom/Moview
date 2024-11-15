import * as React from 'react';
import {StyleSheet, View, ScrollView, Pressable} from 'react-native';
import {Button, Drawer, Text} from 'react-native-paper';
import Colors from '../../styles/Colors';
import Icon from 'react-native-vector-icons/Ionicons';

interface LanguageDrawerProps {
  visible?: boolean;
  onPressToggleHandler?: () => void;
}

const LanguageDrawer: React.FC<LanguageDrawerProps> = ({visible,onPressToggleHandler}) => {
  
  React.useLayoutEffect(() => {
    console.log('visible', visible);
  }, [visible]);

  return (
    <View
      style={[
        styles.drawerWrapperOpened,
        !visible && styles.drawerWrapperClosed,
      ]}>
      <View style={[styles.drawerContentWrapper]}>
        <View style={styles.closeWrapperBtn}>
          <Icon
            name={'close-circle'}
            size={40}
            color={Colors.redColor}
            onPress={onPressToggleHandler}
          />
        </View>

        <ScrollView>
          <Drawer.Section title="Select Langauage">
            <Drawer.Item label="First Item" />
            <Drawer.Item label="Second Item" />
            <Drawer.Item label="First Item" />
            <Drawer.Item label="Second Item" />
            <Drawer.Item label="First Item" />
            <Drawer.Item label="Second Item" />
            <Drawer.Item label="First Item" />
            <Drawer.Item label="Second Item" />
            <Drawer.Item label="First Item" />
            <Drawer.Item label="First Item" />
            <Drawer.Item label="Second Item" />
            <Drawer.Item label="First Item" />
            <Drawer.Item label="Second Item" />
            <Drawer.Item label="First Item" />
            <Drawer.Item label="Second Item" />
            <Drawer.Item label="First Item" />
            <Drawer.Item label="Second Item" />
            <Drawer.Item label="First Item" />
            <Drawer.Item label="First Item" />
            <Drawer.Item label="Second Item" />
            <Drawer.Item label="First Item" />
            <Drawer.Item label="Second Item" />
            <Drawer.Item label="First Item" />
            <Drawer.Item label="Second Item" />
            <Drawer.Item label="First Item" />
            <Drawer.Item label="Last Item" />
            <Drawer.Item label="Last Item" />
          </Drawer.Section>
        </ScrollView>
        <View style={styles.footerWrapper}>
           <Pressable><Text>sdfsdf</Text></Pressable>
           <Pressable><Text>sdfsdf</Text></Pressable>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    backgroundColor: '#fefafe',
    width: '70%',
    minHeight: '100%',
    overflow: 'scroll',
    paddingTop: 15,
    paddingBottom: 45,
  },
  footerWrapper: {
    height: 50,
    width: '100%',
    backgroundColor: Colors.inputBackgroundColor,
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
});
