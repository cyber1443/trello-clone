import React, {useLayoutEffect, useEffect, useState, useCallback} from 'react';
import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  StatusBar,
  View,
  TouchableOpacity,
  TextInput,
  Text,
} from 'react-native';
import {colors, typography} from '../Theme';
import {strings} from '../localization';
import {useHeaderHeight} from '@react-navigation/stack';
import {
  getBoardDetails,
  getLists,
  getCards,
  createCard,
  createList,
} from './lib';
import {
  deleteBoard as deleteBoardRequest,
  updateBoard as updateBoardRequest,
} from '../Boards/lib';
import {deleteBoard, updateBoard} from '../Boards/state/reducer';
import DragableList from './components/DragableList';
import {HeaderBackButton} from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {setLists, setCards, addCard, addList} from './state/reducer';
import CreateListItem from './components/CreateListItem';
import DragableListSkeleton from './components/DragableListSkeleton';
import CheckButton from '../commonComponents/CheckButton';
import {validateName} from './validationHelpers';
import Menu, {MenuItem} from '../commonComponents/PopupMenu';
import {resetState} from '../Card/state/reducer';

const skeletonData = [{}, {}];

const Lists = ({navigation, route}) => {
  const headerHeight = useHeaderHeight();
  const dispatch = useDispatch();
  const {isLoading, lists, cards} = useSelector(
    state => state.lists,
    shallowEqual,
  );
  const [boardBackgroundColor, setBoardBackgroundColor] = useState(null);
  const [boardName, setBoardName] = useState(null);
  const [cardCreationActiveId, setCardCreationActiveId] = useState(null);
  const [isListCreationActive, setIsListCreationActive] = useState(null);
  const [newCardName, setNewCardName] = useState(null);
  const [newListName, setNewListName] = useState(null);

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
    headerTitle: {
      ...typography.heading4,
      color: colors.white.default,
      lineHeight: 30,
      fontSize: 22,
      fontWeight: 'bold',
    },
    contentContainer: {
      paddingLeft: 20,
    },
    headerLeft: {
      marginLeft: 20,
    },
    menu: {
      right: 20,
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
            activateListCreation={activateListCreation}
            listName={newListName}
            setListName={setNewListName}
          />
        ) : (
          <DragableList
            listData={item}
            cardsData={cards}
            isLoading={isLoading}
            cardCreationActiveId={cardCreationActiveId}
            activateCardCreation={activateCardCreation}
            newCardName={newCardName}
            setNewCardName={setNewCardName}
          />
        );
      }
    },
    [
      cardCreationActiveId,
      cards,
      isListCreationActive,
      isLoading,
      newCardName,
      newListName,
    ],
  );

  const keyExtractor = useCallback((item, index) => index.toString(), []);

  const createNewCard = useCallback(async () => {
    if (!validateName(newCardName)) {
      setCardCreationActiveId(null);
      return;
    }
    const {data} = await createCard({
      listId: cardCreationActiveId,
      name: newCardName,
    });
    dispatch(addCard(data));
    setCardCreationActiveId(null);
    setNewCardName(null);
  }, [cardCreationActiveId, dispatch, newCardName]);

  const createNewList = useCallback(async () => {
    if (!validateName(newListName)) {
      setIsListCreationActive(false);
      return;
    }
    const {id} = route.params;
    const {data} = await createList({name: newListName, boardId: id});

    dispatch(addList(data));
    setIsListCreationActive(false);
    setNewListName(null);
  }, [dispatch, newListName, route.params]);

  const activateCardCreation = listId => {
    setIsListCreationActive(false);
    setCardCreationActiveId(listId);
  };

  const activateListCreation = () => {
    setCardCreationActiveId(null);
    setIsListCreationActive(true);
  };

  const onDeletePress = useCallback(async () => {
    const {id} = route.params;
    deleteBoardRequest(id);
    dispatch(deleteBoard(id));
    navigation.goBack();
  }, [dispatch, navigation, route.params]);

  const updateBoardName = useCallback(async () => {
    if (!validateName(boardName)) {
      return;
    }
    const {id} = route.params;
    const {data} = await updateBoardRequest({id, name: boardName});
    dispatch(updateBoard(data));
  }, [boardName, dispatch, route.params]);

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

    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(resetState());
    });

    return unsubscribe;
  }, [
    dispatch,
    getBoardData,
    getDefaultBoardSettings,
    navigation,
    route.params,
  ]);

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

  const getHeaderRight = useCallback(() => {
    return cardCreationActiveId || isListCreationActive ? (
      <CheckButton
        onPress={cardCreationActiveId ? createNewCard : createNewList}
      />
    ) : (
      <Menu style={styles.menu}>
        <MenuItem
          title={strings.delete_board}
          titleColor={colors.red.default}
          onPress={onDeletePress}
        />
      </Menu>
    );
  }, [
    cardCreationActiveId,
    createNewCard,
    createNewList,
    isListCreationActive,
    onDeletePress,
    styles.menu,
  ]);

  const getHeaderTitle = useCallback(() => {
    if (cardCreationActiveId) {
      return <Text style={styles.headerTitle}>{strings.add_card_title} </Text>;
    }
    if (isListCreationActive) {
      return <Text style={styles.headerTitle}>{strings.add_list_title} </Text>;
    }
    return (
      <TextInput
        value={boardName}
        onChangeText={setBoardName}
        style={styles.headerTitle}
        autoCorrect={false}
        placeholder={strings.board_name}
        placeholderTextColor={colors.gray.default}
        onBlur={updateBoardName}
      />
    );
  }, [
    boardName,
    cardCreationActiveId,
    isListCreationActive,
    styles.headerTitle,
    updateBoardName,
  ]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTintColor: colors.white.default,
      headerTransparent: true,
      headerTitle: () => getHeaderTitle(),
      headerBackground: () => <View style={styles.header} />,
      headerLeft: props => getHeaderLeft(props),
      headerRight: () => getHeaderRight(),
    });
  }, [
    boardName,
    getHeaderLeft,
    getHeaderRight,
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
        snapToAlignment="center"
        snapToInterval={335}
        showsHorizontalScrollIndicator={false}
        style={styles.horizontalList}
      />
    </SafeAreaView>
  );
};

export default Lists;
