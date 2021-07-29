import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Signin from '../../AuthFlow/Signin';
import Callback from '../../AuthFlow/Callback';
import {commonNavigationOptions} from '../settings';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={commonNavigationOptions}
      initialRouteName="Signin">
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="Callback" component={Callback} />
    </Stack.Navigator>
  );
};

export default AuthStack;
