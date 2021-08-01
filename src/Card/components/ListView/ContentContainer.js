import React, {memo} from 'react';
import {View, StyleSheet} from 'react-native';
import {colors} from '../../../Theme';

export default memo(({children, index, dataLength}) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.background.default,
      borderTopLeftRadius: !index ? 10 : 0,
      borderTopRightRadius: !index ? 10 : 0,
      borderBottomLeftRadius: index === dataLength - 1 ? 10 : 0,
      borderBottomRightRadius: index === dataLength - 1 ? 10 : 0,
      paddingBottom: 10,
      justifyContent: 'center',
    },
  });
  return (
    <View key={index.toString()} style={styles.container}>
      {children}
    </View>
  );
});
