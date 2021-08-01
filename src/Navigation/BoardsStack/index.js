import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Boards from '../../Boards';
import CreateBoard from '../../CreateBoard';
import Lists from '../../Lists';
import Card from '../../Card';
import {animateNavigationOptions} from '../settings';

const Stack = createStackNavigator();

const BoardStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Boards"
      screenOptions={animateNavigationOptions}>
      <Stack.Screen name="Boards" component={Boards} />
      <Stack.Screen name="CreateBoard" component={CreateBoard} />
      <Stack.Screen name="Lists" component={Lists} />
      <Stack.Screen name="Card" component={Card} />
    </Stack.Navigator>
  );
};

export default BoardStack;
