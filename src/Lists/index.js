import React, {useLayoutEffect, useEffect, useState, useCallback} from 'react';
import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  StatusBar,
  View,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../Theme';
import {strings} from '../localization';
import {useHeaderHeight} from '@react-navigation/stack';
import {getBoardDetails, getLists, getCards} from './lib';
import DragableList from './components/DragableList';
import {HeaderBackButton} from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {setLists, setCards} from './state/reducer';
import CreateListItem from './components/CreateListItem';
import DragableListSkeleton from './components/DragableListSkeleton';

const skeletonData = [{}, {}];

const Lists = ({navigation, route}) => {
  const headerHeight = useHeaderHeight();
  const dispatch = useDispatch();
  const {isLoading, lists, isRefreshing, cards} = useSelector(
    state => state.lists,
    shallowEqual,
  );
  const [boardBackgroundColor, setBoardBackgroundColor] = useState(null);
  const [boardName, setBoardName] = useState(null);
  const [cardCreationActiveId, setCardCreationActiveId] = useState(null);
  const [isListCreationActive, setIsListCreationActive] = useState(null);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: boardBackgroundColor && boardBackgroundColor,
      paddingTop: headerHeight,
    },
    header: {
      backgroundColor: colors.black.transparent30,
      height: headerHeight,
    },
    contentContainer: {
      paddingLeft: 20,
    },
    headerLeft: {
      marginLeft: 20,
    },
  });

  const renderItem = useCallback(
    ({item, index}) => {
      if (isLoading) {
        return <DragableListSkeleton index={index} />;
      } else {
        return item?.isCreate ? (
          <CreateListItem
            isListCreationActive={isListCreationActive}
            setIsListCreationActive={setIsListCreationActive}
          />
        ) : (
          <DragableList
            listData={item}
            cardsData={getCardsForList(item.id)}
            isLoading={isLoading}
            cardCreationActiveId={cardCreationActiveId}
            setCardCreationActiveId={setCardCreationActiveId}
          />
        );
      }
    },
    [cardCreationActiveId, getCardsForList, isListCreationActive, isLoading],
  );

  const keyExtractor = useCallback((item, index) => index.toString(), []);

  const getCardsForList = useCallback(
    listId => {
      return cards.filter(item => item.idList === listId);
    },
    [cards],
  );

  const getDefaultBoardSettings = useCallback(async () => {
    const {id, name, background} = route.params ?? {};
    if (name && background) {
      setBoardBackgroundColor(background);
      setBoardName(name);
    } else {
      const {data} = await getBoardDetails(id);
      setBoardBackgroundColor(data.prefs.backgroundColor);
      setBoardName(data.name);
    }
  }, [route.params]);

  const disableCreationMode = () => {
    setCardCreationActiveId(null);
    setIsListCreationActive(null);
  };

  const getBoardData = useCallback(async () => {
    const {id} = route.params;
    const {data} = await getLists(id);
    dispatch(setLists(data));

    const {data: cardsData} = await getCards(id);
    dispatch(setCards(cardsData));
  }, [dispatch, route.params]);

  useEffect(() => {
    getDefaultBoardSettings();
    getBoardData();
  }, [getBoardData, getDefaultBoardSettings, route.params]);

  const getHeaderLeft = useCallback(
    props => {
      return cardCreationActiveId || isListCreationActive ? (
        <TouchableOpacity
          style={styles.headerLeft}
          onPress={disableCreationMode}>
          <MaterialIcons name="close" color={colors.white.default} size={25} />
        </TouchableOpacity>
      ) : (
        <HeaderBackButton {...props} />
      );
    },
    [cardCreationActiveId, isListCreationActive, styles.headerLeft],
  );

  const getHeaderTitle = useCallback(() => {
    if (cardCreationActiveId) {
      return strings.add_card_title;
    }
    if (isListCreationActive) {
      return strings.add_list_title;
    }
    return boardName ? boardName : '';
  }, [boardName, cardCreationActiveId, isListCreationActive]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTintColor: colors.white.default,
      headerTransparent: true,
      headerTitle: getHeaderTitle(),
      headerBackground: () => <View style={styles.header} />,
      headerLeft: props => getHeaderLeft(props),
    });
  }, [
    boardName,
    getHeaderLeft,
    getHeaderTitle,
    headerHeight,
    navigation,
    styles.header,
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor={colors.black.transparent30}
        barStyle="light-content"
      />
      <FlatList
        data={isLoading ? skeletonData : [...lists, {isCreate: true}]}
        horizontal
        pagingEnabled
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.contentContainer}
        snapToAlignment="start"
        snapToInterval={320}
        showsHorizontalScrollIndicator={false}
        style={styles.horizontalList}
      />
    </SafeAreaView>
  );
};

export default Lists;
