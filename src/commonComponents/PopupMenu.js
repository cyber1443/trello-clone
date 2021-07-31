import React from 'react';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {StyleSheet, Text} from 'react-native';
import {colors, typography} from '../Theme';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default ({children, style, onBackdropPress}) => {
  return (
    <Menu style={[styles.container, style]} onBackdropPress={onBackdropPress}>
      <MenuTrigger>
        <MaterialIcons
          name="dots-vertical"
          size={25}
          color={colors.white.default}
        />
        <Text style={styles.textButton} />
      </MenuTrigger>
      <MenuOptions optionsContainerStyle={styles.optionsContainer}>
        {children}
      </MenuOptions>
    </Menu>
  );
};

export const MenuItem = ({onPress, title, titleColor}) => (
  <MenuOption onSelect={onPress}>
    <Text style={{...styles.text, color: titleColor && titleColor}}>
      {title}
    </Text>
  </MenuOption>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  optionsContainer: {
    backgroundColor: colors.background.light,
    elevation: 5,
  },
  text: {
    ...typography.heading5,
    color: colors.white.default,
    padding: 5,
  },
  textButton: {
    position: 'absolute',
    height: 50,
    width: 50,
  },
});
