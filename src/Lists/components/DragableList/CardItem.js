import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {colors, typography} from '../../../Theme';

export default ({item, drag, isActive}) => {
  const styles = StyleSheet.create({
    container: {
      width: 300,
      backgroundColor: colors.black.transparent30,
      marginBottom: 10,
      transform: [{scale: isActive ? 0.95 : 1}],
      marginHorizontal: 10,
      borderRadius: 10,
      padding: 10,
    },
    title: {
      ...typography.heading5,
      color: colors.white.default,
    },
  });

  return (
    <TouchableOpacity key={item.id} style={styles.container} onLongPress={drag}>
      <Text style={styles.title}>{item?.name}</Text>
    </TouchableOpacity>
  );
};
