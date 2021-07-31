import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import {colors, typography} from '../Theme';

export default ({value, onChange, placeholder}) => {
  const styles = StyleSheet.create({
    container: {
      height: 50,
      borderWidth: 1,
      borderColor: colors.gray.default,
      borderRadius: 10,
      paddingHorizontal: 20,
      ...typography.heading4,
      color: colors.white.default,
    },
  });

  return (
    <TextInput
      style={styles.container}
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
      placeholderTextColor={colors.gray.default}
    />
  );
};
