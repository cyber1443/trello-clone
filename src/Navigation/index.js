import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AuthStack from './AuthStack';
import BoardsStack from './BoardsStack';
import {commonNavigationOptions, linking} from './settings';
import {useSelector} from 'react-redux';

const Stack = createStackNavigator();

const MainNavigator = () => {
  const {authenticationFlow} = useSelector(state => state.auth);
  const isAuthCompleted = authenticationFlow === 'Completed';
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator>
        {!isAuthCompleted ? (
          <Stack.Screen
            name="AuthStack"
            component={AuthStack}
            options={commonNavigationOptions}
          />
        ) : (
          <Stack.Screen
            name="BoardsStack"
            component={BoardsStack}
            options={commonNavigationOptions}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
