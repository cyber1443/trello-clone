import React, {useLayoutEffect, useEffect, useState, useCallback} from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TextInput,
} from 'react-native';
import {colors, typography} from '../Theme';
import {
  getData as getCardData,
  updateCard as updateCardRequest,
  deleteCard as deleteCardRequest,
  getComments as getCommentsRequest,
  createComment as createCommentRequest,
  updateComment as updateCommentRequest,
  deleteComment as deleteCommentRequest,
} from './lib';
import {strings} from '../localization';
import {updateCard, deleteCard} from '../Lists/state/reducer';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import Menu, {MenuItem} from '../commonComponents/PopupMenu';
import InputField from '../commonComponents/InputField';
import Dropdown from '../commonComponents/Dropdown';
import ListView from './components/ListView';
import CommentInput from './components/CommentInput';
import {
  setComments,
  addComment,
  updateComment,
  deleteComment,
} from './state/reducer';
import {getLists as getListsRequest} from '../Lists/lib/getLists';
import {setLists} from '../Lists/state/reducer';

const Card = ({navigation, route}) => {
  const {comments, isLoading} = useSelector(
    state => state.comments,
    shallowEqual,
  );
  const dispatch = useDispatch();
  const state = useSelector(rootState => rootState.lists);
  const {lists} = state ?? {};
  const [cardData, setCardData] = useState(null);
  const [cardName, setCardName] = useState(null);
  const [cardDesc, setCardDesc] = useState(null);
  const [newCommentText, setNewCommentText] = useState(null);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.light,
    },
    header: {
      backgroundColor: colors.background.light,
      elevation: 0,
    },
    headerTitle: {
      ...typography.heading4,
      color: colors.white.default,
      lineHeight: 30,
      fontSize: 22,
      fontWeight: 'bold',
    },
    menu: {
      right: 20,
    },
    input: {
      marginTop: 20,
      height: 200,
    },
    dropdownText: {
      ...typography.heading4,
      color: colors.gray.default,
      marginTop: 20,
      marginBottom: 10,
    },
    dropdown: {
      marginBottom: 20,
    },
  });

  const getCardDetails = useCallback(async () => {
    const {id, data: cardParamData, boardId} = route.params;
    if (boardId) {
      getListFromDeepLink(boardId);
    }
    if (cardParamData) {
      setCardData(cardParamData);
      setCardName(cardParamData.name);
      setCardDesc(cardParamData.desc);
    } else {
      const {data} = await getCardData(id);
      setCardData(data);
      setCardName(data.name);
      setCardDesc(data.desc);
    }
  }, [getListFromDeepLink, route.params]);

  const getListFromDeepLink = useCallback(
    async boardId => {
      const {data} = await getListsRequest(boardId);
      dispatch(setLists(data));
    },
    [dispatch],
  );

  const getCommentsDetails = useCallback(async () => {
    const {id} = route.params;
    const {data} = await getCommentsRequest(id);
    dispatch(setComments(data));
  }, [dispatch, route.params]);

  const createNewComment = async () => {
    if (!newCommentText) {
      return;
    }
    const {id} = cardData;
    const {data} = await createCommentRequest({id, text: newCommentText});
    dispatch(addComment(data));
    setNewCommentText(null);
  };

  const updateCommentData = async ({text, actionId}) => {
    const {id} = cardData;
    const {data} = await updateCommentRequest({id, actionId, text});
    dispatch(updateComment(data));
  };

  const onDeleteCommentPress = actionId => {
    const {id} = cardData;
    deleteCommentRequest({id, actionId});
    dispatch(deleteComment(actionId));
  };

  const updateCardTitle = useCallback(async () => {
    const {id} = cardData;
    const {data} = await updateCardRequest({id, name: cardName});
    dispatch(updateCard(data));
  }, [cardData, cardName, dispatch]);

  const updateCardDesc = useCallback(async () => {
    const {id} = cardData;
    const {data} = await updateCardRequest({id, desc: cardDesc});
    dispatch(updateCard(data));
  }, [cardData, cardDesc, dispatch]);

  const onDeletePress = useCallback(() => {
    const {id} = cardData;
    deleteCardRequest(id);
    dispatch(deleteCard(id));
    navigation.goBack();
  }, [cardData, dispatch, navigation]);

  const getLists = () => {
    if (lists) {
      return lists;
    }
  };

  const getDefaultListValue = () => {
    if (lists) {
      return lists.find(item => item?.id === cardData?.idList);
    }
  };

  const onListSelect = async selectedItem => {
    const {id: listId} = selectedItem;
    const {id} = cardData;
    const {data} = await updateCardRequest({id, listId, pos: 'top'});
    dispatch(updateCard(data));
  };

  useEffect(() => {
    getCardDetails();
    getCommentsDetails();
  }, [getCardDetails, getCommentsDetails]);

  const getHeaderTitle = useCallback(
    () => (
      <TextInput
        value={cardName}
        onChangeText={setCardName}
        style={styles.headerTitle}
        autoCorrect={false}
        placeholder={strings.card_name}
        placeholderTextColor={colors.gray.default}
        onBlur={updateCardTitle}
      />
    ),
    [cardName, styles.headerTitle, updateCardTitle],
  );

  const getHeaderRight = useCallback(
    () => (
      <Menu style={styles.menu}>
        <MenuItem
          title={strings.delete_card}
          titleColor={colors.red.default}
          onPress={onDeletePress}
        />
      </Menu>
    ),
    [onDeletePress, styles.menu],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: styles.header,
      headerTintColor: colors.white.default,
      headerTitle: () => getHeaderTitle(),
      headerRight: () => getHeaderRight(),
    });
  }, [getHeaderRight, getHeaderTitle, navigation, styles.header]);

  const ListHeaderComponent = (
    <>
      <InputField
        placeholder={strings.card_description}
        style={styles.input}
        multiline
        value={cardDesc}
        onChange={setCardDesc}
        onBlur={updateCardDesc}
      />
      <Text style={styles.dropdownText}> {strings.change_card_list} </Text>

      <Dropdown
        data={getLists()}
        defaultValue={getDefaultListValue()}
        onSelect={onListSelect}
        style={styles.dropdown}
      />

      <Text style={styles.dropdownText}> {strings.comments} </Text>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={colors.background.light}
        barStyle="light-content"
      />
      <ListView
        data={comments}
        isLoading={isLoading}
        ListHeaderComponent={ListHeaderComponent}
        updateCommentData={updateCommentData}
        deleteCommentData={onDeleteCommentPress}
      />
      <CommentInput
        newCommentText={newCommentText}
        setNewCommentText={setNewCommentText}
        createNewComment={createNewComment}
      />
    </SafeAreaView>
  );
};

export default Card;
