import React, {useEffect, useLayoutEffect, useCallback} from 'react';
import {StatusBar, StyleSheet, SafeAreaView} from 'react-native';
import {getData} from './lib/getData';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import ListView from './components/ListView';
import FloatingButton from './components/FloatingButton';
import {setBoards, startRefresh} from './state/reducer';
import {colors} from '../Theme';

const Boards = ({navigation}) => {
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

  useEffect(() => {
    getBoardsData();
  }, [getBoardsData]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.gray.light,
    },
    button: {
      position: 'absolute',
      bottom: 20,
      right: 20,
    },
    header: {
      borderBottomWidth: 1,
    },
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: styles.header,
    });
  }, [navigation, styles.header]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={colors.white.default}
        barStyle={'dark-content'}
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
