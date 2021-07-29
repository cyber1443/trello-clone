import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import MainNavigator from './src/Navigation';
import RNBootSplash from 'react-native-bootsplash';

const App = () => {
  useEffect(() => {
    RNBootSplash.hide({fade: true});
  }, []);

  return (
    <SafeAreaProvider>
      <MainNavigator />
    </SafeAreaProvider>
  );
};

export default App;
