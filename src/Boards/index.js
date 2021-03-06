import React, {useEffect, useLayoutEffect, useCallback} from 'react';
import {StatusBar, StyleSheet, SafeAreaView} from 'react-native';
import {getData} from './lib/getData';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import ListView from './components/ListView';
import FloatingButton from './components/FloatingButton';
import {setBoards, startRefresh} from './state/reducer';
import {colors} from '../Theme';
import {resetState} from '../Lists/state/reducer';

const Boards = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {boards, isLoading, isRefreshing} = useSelector(
    state => state.boards,
    shallowEqual,
  );

  const getBoardsData = useCallback(async () => {
    const {data} = await getData();
    dispatch(setBoards(data));
  }, [dispatch]);

  const openCreateBoard = () => {
    navigation.navigate('CreateBoard');
  };

  const handleOnRefresh = useCallback(() => {
    dispatch(startRefresh());
    getBoardsData();
  }, [dispatch, getBoardsData]);

  const handleDeepLink = useCallback(
    boardId => {
      navigation.navigate('Lists', {id: boardId});
    },
    [navigation],
  );

  useEffect(() => {
    const {id} = route.params ?? {};
    if (id) {
      handleDeepLink(id);
    }
    getBoardsData();

    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(resetState());
    });

    return unsubscribe;
  }, [dispatch, getBoardsData, handleDeepLink, navigation, route.params]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.default,
    },
    button: {
      position: 'absolute',
      bottom: 20,
      right: 20,
    },
    header: {
      backgroundColor: colors.background.light,
    },
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: styles.header,
      headerTintColor: colors.white.default,
    });
  }, [navigation, styles.header]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={colors.background.light}
        barStyle={'light-content'}
        translucent
      />
      <ListView
        data={boards}
        isLoading={isLoading}
        isRefreshing={isRefreshing}
        handleOnRefresh={handleOnRefresh}
      />
      <FloatingButton style={styles.button} onPress={openCreateBoard} />
    </SafeAreaView>
  );
};

export default Boards;
