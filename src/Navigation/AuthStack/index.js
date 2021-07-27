import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Signup from '../../AuthFlow/Signup';
import {commonNavigationOptions} from '../settings';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={commonNavigationOptions}
      initialRouteName="Signup">
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
};

export default AuthStack;
