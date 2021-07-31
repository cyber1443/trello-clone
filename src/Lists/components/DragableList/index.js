import React, {useCallback} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import CardItem from './CardItem';
import CreateCardItem from './CreateCardItem';
import {colors, typography} from '../../../Theme';

export default ({
  listData,
  cardsData,
  cardCreationActiveId,
  setCardCreationActiveId,
}) => {
  const renderItem = useCallback(
    ({item, index, drag, isActive}) => {
      if (item?.isCreate) {
        return (
          <CreateCardItem
            listId={listData.id}
            cardCreationActiveId={cardCreationActiveId}
            setCardCreationActiveId={setCardCreationActiveId}
          />
        );
      } else {
        return <CardItem item={item} drag={drag} isActive={isActive} />;
      }
    },
    [cardCreationActiveId, listData.id, setCardCreationActiveId],
  );

  const keyExtractor = useCallback((item, index) => index.toString(), []);

  const styles = StyleSheet.create({
    container: {
      marginRight: 20,
      marginTop: 20,
    },
    header: {
      height: 50,
      backgroundColor: colors.black.transparent30,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      paddingLeft: 20,
      justifyContent: 'center',
      minWidth: 320,
    },
    headerTitle: {
      ...typography.heading4,
      color: colors.white.default,
      fontWeight: 'bold',
    },
    list: {
      backgroundColor: colors.black.transparent30,
      flexGrow: 0,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{listData.name}</Text>
      </View>
      <DraggableFlatList
        data={[...cardsData, {isCreate: true}]}
        activationDistance={10}
        autoscrollSpeed={700}
        dragItemOverflow={true}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        style={styles.list}
      />
    </View>
  );
};
