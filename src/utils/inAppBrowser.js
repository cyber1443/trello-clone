import {Alert, Linking} from 'react-native';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';

const properties = {
  // iOS Properties
  ephemeralWebSession: false,
  // Android Properties
  showTitle: false,
  enableUrlBarHiding: true,
  enableDefaultShare: false,
};

const openAuth = async ({url, deepLink}) => {
  try {
    if (await InAppBrowser.isAvailable()) {
      InAppBrowser.openAuth(url, deepLink, properties)
        .then(response => {
          if (response.type === 'success' && response.url) {
            Linking.openURL(response.url);
          }
        })
        .catch(e => console.log('err', e));
    } else {
      Linking.openURL(url);
    }
  } catch (e) {
    Alert.alert(e.message);
  }
};

export {openAuth};
