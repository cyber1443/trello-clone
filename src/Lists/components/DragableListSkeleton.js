import React from 'react';
import {View, StyleSheet} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {colors} from '../../Theme';

export default ({index}) => {
  const styles = StyleSheet.create({
    container: {
      width: 320,
      padding: 10,
      backgroundColor: colors.black.transparent30,
      marginRight: 20,
      marginTop: 20,
      borderRadius: 10,
    },
    title: {
      height: 30,
      borderRadius: 3,
      marginBottom: 20,
    },
    card1: {
      height: 60,
      borderRadius: 10,
      marginBottom: 10,
    },
    card2: {
      height: 100,
      borderRadius: 10,
      marginBottom: 10,
    },
  });

  return (
    <View key={index.toString()} style={styles.container}>
      <SkeletonPlaceholder
        speed={800}
        highlightColor={colors.background.default}
        backgroundColor={colors.background.light}>
        <View style={styles.title} />
        <View style={styles.card1} />
        <View style={styles.card2} />
        <View style={styles.card2} />
        <View style={styles.card1} />
        <View style={styles.card1} />
        <View style={styles.card1} />
      </SkeletonPlaceholder>
    </View>
  );
};
