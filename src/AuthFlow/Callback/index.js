import React, {useEffect} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {colors} from '../../Theme';
import {setCredentials} from '../../utils/storage';
import {useDispatch} from 'react-redux';
import {updateAuth} from '../Signin/state/reducer';

export default ({route, navigation}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const {token} = route.params ?? {};
    console.log('TOKEN', token);
    if (token) {
      setCredentials({token});
      dispatch(updateAuth('Completed'));
    } else {
      navigation.goBack();
    }
  }, [dispatch, navigation, route.params]);

  const styles = StyleSheet.create({
    indicator: {
      flex: 1,
    },
  });

  return (
    <ActivityIndicator
      style={styles.indicator}
      size="large"
      color={colors.primary}
    />
  );
};
