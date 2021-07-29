import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Boards from '../../Boards';

const Stack = createStackNavigator();

const BoardStack = () => {
  return (
    <Stack.Navigator initialRouteName="Boards">
      <Stack.Screen name="Boards" component={Boards} />
    </Stack.Navigator>
  );
};

export default BoardStack;
