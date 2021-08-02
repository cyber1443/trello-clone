import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {store, peristor} from './src/state/store';
import {MenuProvider} from 'react-native-popup-menu';
const renderApp = () => {
  LogBox.ignoreAllLogs(true);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={peristor}>
        <MenuProvider>
          <App />
        </MenuProvider>
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => renderApp);
