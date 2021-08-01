import React, {useCallback, useEffect} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {colors} from '../../Theme';
import {setCredentials} from '../../utils/storage';
import {useDispatch} from 'react-redux';
import {updateAuth} from '../Signin/state/reducer';
import {setProfile} from '../state/reducer';
import {getProfile} from '../lib/getProfile';

export default ({route, navigation}) => {
  const dispatch = useDispatch();

  const saveProfile = useCallback(async () => {
    const {data} = await getProfile();
    dispatch(setProfile(data));
  }, [dispatch]);

  useEffect(() => {
    const {token} = route.params ?? {};
    if (token) {
      setCredentials({token});
      saveProfile();
      dispatch(updateAuth('Completed'));
    } else {
      navigation.goBack();
    }
  }, [dispatch, navigation, route.params, saveProfile]);

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
