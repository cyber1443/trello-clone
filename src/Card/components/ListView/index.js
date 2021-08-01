import React, {useCallback} from 'react';
import {FlatList, StyleSheet, View, Text} from 'react-native';
import {colors, typography} from '../../../Theme';
import CommentItem from './CommentItem';
import CommentSkeleton from './CommentSkeleton';
import LottieView from 'lottie-react-native';
import {strings} from '../../../localization';
import ContentContainer from './ContentContainer';

const skeletonData = [{}, {}, {}, {}, {}, {}, {}, {}, {}];
export default ({
  data,
  isLoading,
  ListHeaderComponent,
  updateCommentData,
  deleteCommentData,
}) => {
  const keyExtractor = useCallback(
    (item, index) => (isLoading ? index.toString() : item.id),
    [isLoading],
  );

  const renderItem = useCallback(
    ({item, index}) => {
      return (
        <ContentContainer index={index} dataLength={data?.length}>
          {isLoading ? (
            <CommentSkeleton index={index} />
          ) : (
            <CommentItem
              item={item}
              updateCommentData={updateCommentData}
              deleteCommentData={deleteCommentData}
            />
          )}
        </ContentContainer>
      );
    },
    [data?.length, deleteCommentData, isLoading, updateCommentData],
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
      paddingHorizontal: 20,
      paddingBottom: 80,
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
      ListHeaderComponent={ListHeaderComponent}
    />
  );
};
