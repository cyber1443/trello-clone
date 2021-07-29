import React, {useCallback} from 'react';
import {FlatList, StyleSheet, View, RefreshControl, Text} from 'react-native';
import {colors, typography} from '../../../Theme';
import BoardItem from './BoardItem';
import BoardSkeleton from './BoardSkeleton';
import LottieView from 'lottie-react-native';
import {strings} from '../../../localization';

export default ({data, isLoading, handleOnRefresh, isRefreshing}) => {
  const skeletonData = [{}, {}, {}, {}, {}, {}, {}, {}, {}];
  const keyExtractor = useCallback(
    (item, index) => (isLoading ? index.toString() : item.id),
    [isLoading],
  );

  const renderItem = useCallback(
    ({item, index}) =>
      isLoading ? <BoardSkeleton index={index} /> : <BoardItem item={item} />,
    [isLoading],
  );

  const listEmptyComponent = () => (
    <View style={styles.animationContainer}>
      <LottieView
        source={require('../../../assets/empty-box.json')}
        autoPlay
        loop
      />
      <Text style={styles.animationText}>{strings.no_boards}</Text>
    </View>
  );

  const styles = StyleSheet.create({
    contentContainer: {
      padding: 20,
    },
    animationContainer: {
      height: 400,
      width: 200,
      alignSelf: 'center',
      justifyContent: 'center',
    },
    animationText: {
      ...typography.heading5,
      color: colors.gray.default,
      textAlign: 'center',
      marginTop: 200,
    },
  });

  return (
    <FlatList
      data={isLoading ? skeletonData : data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      contentContainerStyle={styles.contentContainer}
      ListEmptyComponent={listEmptyComponent}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={handleOnRefresh}
          colors={[colors.primary]}
        />
      }
    />
  );
};
