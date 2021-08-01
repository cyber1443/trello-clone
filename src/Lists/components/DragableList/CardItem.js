import React, {memo} from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import {colors, typography} from '../../../Theme';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default memo(({item, drag, isActive}) => {
  const navigation = useNavigation();

  const openCard = () => {
    navigation.navigate('Card', {id: item.id, data: item});
  };

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
    options: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconDesc: {
      marginLeft: -3,
      marginTop: 3,
    },
    iconComment: {
      marginLeft: item?.desc ? 10 : -3,
      marginTop: 3,
    },
  });

  return (
    <TouchableOpacity
      onPress={openCard}
      key={item?.id}
      style={styles.container}
      onLongPress={drag}>
      <Text style={styles.title}>{item?.name}</Text>
      <View style={styles.options}>
        {item.desc ? (
          <MaterialIcons
            name="text-subject"
            color={colors.white.default}
            size={20}
            style={styles.iconDesc}
          />
        ) : null}
        {item?.badges?.comments ? (
          <MaterialIcons
            name="comment-text-outline"
            color={colors.white.default}
            size={20}
            style={styles.iconComment}
          />
        ) : null}
      </View>
    </TouchableOpacity>
  );
});
