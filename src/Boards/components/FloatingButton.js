import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {colors} from '../../Theme';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default ({onPress, style}) => {
  const styles = StyleSheet.create({
    container: {
      height: 60,
      width: 60,
      borderRadius: 40,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.green.dark,
      elevation: 4,
      ...style,
    },
  });

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <AntDesign name="plus" color={colors.white.default} size={25} />
    </TouchableOpacity>
  );
};
