import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import {colors, typography} from '../Theme';

export default ({value, onChange, placeholder, style, multiline, onBlur}) => {
  const styles = StyleSheet.create({
    container: {
      height: 50,
      borderWidth: 1,
      borderColor: colors.gray.default,
      borderRadius: 10,
      padding: 20,
      paddingVertical: 10,
      textAlignVertical: multiline ? 'top' : 'center',
      ...typography.heading4,
      color: colors.white.default,
      ...style,
    },
  });

  return (
    <TextInput
      style={styles.container}
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
      placeholderTextColor={colors.gray.default}
      multiline={multiline}
      autoCorrect={false}
      onBlur={onBlur}
    />
  );
};
