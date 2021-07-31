import React, {useCallback, useState, useEffect, memo} from 'react';
import {View, StyleSheet} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import CardItem from './CardItem';
import CreateCardItem from './CreateCardItem';
import {colors, typography} from '../../../Theme';
import {
  updateCardPos,
  updateList as updateListRequest,
  deleteList as deleteListRequest,
} from '../../lib';
import {updateCard, updateList, deleteList} from '../../state/reducer';
import {useDispatch} from 'react-redux';
import ListHeader from './ListHeader';
import {validateName} from '../../validationHelpers';

export default memo(
  ({
    listData,
    cardsData,
    cardCreationActiveId,
    activateCardCreation,
    newCardName,
    setNewCardName,
  }) => {
    const dispatch = useDispatch();
    const [cards, setCards] = useState([]);
    const [listName, setListName] = useState(listData.name);

    useEffect(() => {
      const listCards = cardsData.filter(item => listData.id === item.idList);
      const sortedCards = listCards.sort((a, b) => a.pos - b.pos);
      setCards(sortedCards);
    }, [cardsData, listData.id]);

    const updateListTitle = async () => {
      if (!validateName(listName)) {
        return;
      }

      const {data} = await updateListRequest({id: listData.id, name: listName});
      dispatch(updateList(data));
    };

    const onDeletePress = async () => {
      const {data} = await deleteListRequest(listData.id);
      dispatch(deleteList(data));
    };

    const renderItem = useCallback(
      ({item, drag, isActive}) => {
        if (item?.isCreate) {
          return (
            <CreateCardItem
              listId={listData.id}
              cardCreationActiveId={cardCreationActiveId}
              activateCardCreation={activateCardCreation}
              newCardName={newCardName}
              setNewCardName={setNewCardName}
            />
          );
        } else {
          return <CardItem item={item} drag={drag} isActive={isActive} />;
        }
      },
      [
        activateCardCreation,
        cardCreationActiveId,
        listData.id,
        newCardName,
        setNewCardName,
      ],
    );

    const keyExtractor = useCallback((item, index) => index.toString(), []);

    const onDragEnd = async dragData => {
      const {data, from, to} = dragData;
      const cardId = cards[from]?.id;
      let newPos = null;
      switch (to) {
        case 0: {
          newPos = 'top';
          break;
        }
        case data.length - 1:
        case cards.length - 1: {
          newPos = 'bottom';
          break;
        }
        default: {
          if (from > to) {
            const prevItemPos = cards[to - 1].pos;
            const nextItemPos = cards[to].pos;
            newPos = parseFloat((prevItemPos + nextItemPos) / 2);
            break;
          } else {
            const prevItemPos = cards[to].pos;
            const nextItemPos = cards[to + 1].pos;
            newPos = parseFloat((prevItemPos + nextItemPos) / 2);
            break;
          }
        }
      }
      const newData = data.filter(item => (item?.isCreate ? false : item));
      setCards(newData);
      const {data: cardData} = await updateCardPos({id: cardId, pos: newPos});
      dispatch(updateCard(cardData));
    };

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
        alignItems: 'center',
        minWidth: 320,
        flexDirection: 'row',
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
        <ListHeader
          title={listName}
          setTitle={setListName}
          onCancel={updateListTitle}
          onDeletePress={onDeletePress}
        />
        <DraggableFlatList
          data={[...cards, {isCreate: true}]}
          activationDistance={10}
          autoscrollSpeed={700}
          dragItemOverflow={true}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
          style={styles.list}
          onDragEnd={onDragEnd}
        />
      </View>
    );
  },
);
