import React from 'react';
import {StyleSheet} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {colors, typography} from '../Theme';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default ({defaultValue, defaultTitle, style, data, onSelect}) => {
  const styles = StyleSheet.create({
    dropdown: {
      backgroundColor: colors.background.light,
      borderRadius: 10,
      marginTop: -20,
    },
    button: {
      backgroundColor: colors.background.default,
      width: '100%',
      borderRadius: 10,
      ...style,
    },
    buttonText: {
      ...typography.heading4,
      color: colors.white.default,
      textAlign: 'left',
    },
    defaultButtonText: {
      ...typography.heading4,
      color: colors.white.default,
      textAlign: 'left',
    },
    rowText: {
      ...typography.heading5,
      color: colors.white.default,
      textAlign: 'left',
    },
    rowStyle: {
      paddingHorizontal: 10,
      borderBottomWidth: 0,
    },
  });

  return (
    <SelectDropdown
      data={data ? data : []}
      onSelect={(selectedItem, index) => {
        onSelect(selectedItem);
      }}
      defaultValue={defaultValue}
      defaultButtonText={defaultTitle}
      dropdownStyle={styles.dropdown}
      buttonTextStyle={styles.buttonText}
      buttonStyle={styles.button}
      renderDropdownIcon={() => (
        <MaterialIcons
          name="chevron-down"
          color={colors.gray.default}
          size={30}
        />
      )}
      rowTextStyle={styles.rowText}
      rowStyle={styles.rowStyle}
      buttonTextAfterSelection={(selectedItem, index) => {
        return selectedItem.name;
      }}
      rowTextForSelection={(item, index) => {
        return item.name;
      }}
    />
  );
};
