import {Platform} from 'react-native';
export const getDeepLink = (path = '') => {
  const scheme = 'app';
  const host = 'trelloClone';
  const prefix =
    Platform.OS === 'android' ? `${scheme}://${host}/` : `${scheme}://`;
  return prefix + path;
};
