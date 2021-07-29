import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import {typography} from '../../../Theme';

export default ({item}) => {
  const styles = StyleSheet.create({
    container: {
      height: 50,
      width: '100%',
      marginBottom: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    image: {
      height: 50,
      width: 50,
      borderRadius: 5,
      backgroundColor:
        !item.prefs.backgroundImage && item.prefs.backgroundColor,
    },
    text: {
      ...typography.heading5,
      marginLeft: 20,
    },
  });

  return (
    <TouchableOpacity key={item.id} style={styles.container}>
      <Image style={styles.image} source={{uri: item.prefs.backgroundImage}} />
      <Text numberOfLines={1} style={styles.text}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};
