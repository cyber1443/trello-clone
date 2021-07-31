import React from 'react';
import {View, StyleSheet} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {colors} from '../../../Theme';

export default ({index}) => {
  const styles = StyleSheet.create({
    container: {
      height: 50,
      width: '100%',
      marginBottom: 10,
    },
    image: {
      height: 50,
      width: 50,
      borderRadius: 5,
    },
    text: {
      height: 15,
      width: 150,
      marginLeft: 20,
      borderRadius: 3,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });

  return (
    <View key={index.toString()} style={styles.container}>
      <SkeletonPlaceholder
        speed={800}
        highlightColor={colors.background.default}
        backgroundColor={colors.background.light}>
        <View style={styles.row}>
          <View style={styles.image} />
          <View style={styles.text} />
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};
