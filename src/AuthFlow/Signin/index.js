import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SigninButton from './components/SigninButton';
import {colors} from '../../Theme';
import {useDispatch} from 'react-redux';
import {updateAuth} from './state/reducer';
import {signin} from './lib/signin';

const Signin = () => {
  const dispatch = useDispatch();

  const trelloSignin = () => {
    dispatch(updateAuth('Started'));
    signin();
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: 40,
      backgroundColor: colors.white.default,
    },
    logo: {
      height: 200,
      marginTop: 150,
    },
    button: {
      position: 'absolute',
      bottom: 60,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/logo.png')}
        resizeMode="contain"
      />
      <SigninButton onPress={trelloSignin} style={styles.button} />
    </SafeAreaView>
  );
};

export default Signin;
