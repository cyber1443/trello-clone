import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {colors, typography} from '../../../Theme';
import {strings} from '../../../localization';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default ({onPress, style}) => {
  const styles = StyleSheet.create({
    container: {
      height: 60,
      width: '100%',
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      flexDirection: 'row',
      ...style,
    },
    text: {
      ...typography.heading4,
      color: colors.white.default,
    },
    icon: {
      marginLeft: 20,
    },
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={styles.container}>
      <Text style={styles.text}>{strings.signin_title}</Text>
      <AntDesign
        style={styles.icon}
        name="arrowright"
        color={colors.white.default}
        size={25}
      />
    </TouchableOpacity>
  );
};
