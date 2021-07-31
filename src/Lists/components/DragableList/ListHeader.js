import React from 'react';
import {TextInput, StyleSheet, View} from 'react-native';
import {colors, typography} from '../../../Theme';
import Menu, {MenuItem} from '../../../commonComponents/PopupMenu';
import {strings} from '../../../localization';

export default ({title, setTitle, onCancel, onDeletePress}) => {
  const styles = StyleSheet.create({
    header: {
      height: 50,
      backgroundColor: colors.black.transparent30,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      paddingLeft: 20,
      alignItems: 'center',
      minWidth: 320,
      flexDirection: 'row',
    },
    headerTitle: {
      ...typography.heading4,
      color: colors.white.default,
      fontWeight: 'bold',
    },
    menu: {
      right: 10,
    },
    input: {
      ...typography.heading4,
      color: colors.white.default,
      fontWeight: 'bold',
      maxWidth: 260,
      justifyContent: 'center',
    },
  });

  return (
    <View style={styles.header}>
      <TextInput
        numberOfLines={1}
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        onBlur={onCancel}
        autoCorrect={false}
        placeholder={strings.list_name}
        placeholderTextColor={colors.gray.default}
      />
      <Menu style={styles.menu}>
        <MenuItem
          title={strings.delete_list}
          titleColor={colors.red.default}
          onPress={onDeletePress}
        />
      </Menu>
    </View>
  );
};
