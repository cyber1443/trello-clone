import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {typography, colors} from '../Theme';

export default ({message}) => {
  const styles = StyleSheet.create({
    text: {
      ...typography.heading5,
      marginTop: 5,
      color: colors.red.default,
    },
  });

  return <Text style={styles.text}>{message}</Text>;
};
