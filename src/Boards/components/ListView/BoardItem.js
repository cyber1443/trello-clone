import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import {colors, typography} from '../../../Theme';
import {useNavigation} from '@react-navigation/native';

export default ({item}) => {
  const navigation = useNavigation();

  const openBoard = () => {
    navigation.navigate('Lists', {
      id: item.id,
      name: item.name,
      background: item.prefs.backgroundColor,
    });
  };

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
      color: colors.gray.default,
    },
  });

  return (
    <TouchableOpacity
      onPress={openBoard}
      key={item.id}
      style={styles.container}>
      <Image style={styles.image} source={{uri: item.prefs.backgroundImage}} />
      <Text numberOfLines={1} style={styles.text}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};
