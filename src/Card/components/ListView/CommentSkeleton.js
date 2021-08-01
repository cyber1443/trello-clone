import React from 'react';
import {View, StyleSheet} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {colors} from '../../../Theme';

export default ({index}) => {
  const styles = StyleSheet.create({
    container: {
      //   height: 50,
      width: '100%',
      marginBottom: 10,
      padding: 10,
    },
    image: {
      height: 50,
      width: 50,
      borderRadius: 30,
    },
    text1: {
      height: 20,
      width: 250,
      marginLeft: 20,
      borderRadius: 3,
      marginBottom: 10,
    },
    text2: {
      height: 40,
      width: 250,
      marginLeft: 20,
      borderRadius: 3,
      marginBottom: 10,
    },
    text3: {
      height: 15,
      width: 80,
      marginLeft: 20,
      borderRadius: 3,
      marginBottom: 10,
    },
    row: {
      flexDirection: 'row',
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
          <View>
            <View style={styles.text1} />
            <View style={styles.text2} />
            <View style={styles.text3} />
          </View>
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};
