import {MMKV} from 'react-native-mmkv';

export const setCredentials = credentials => {
  const credentialsJson = JSON.stringify(credentials);
  MMKV.set('credentials', credentialsJson);
};

export const getCredentials = () => {
  const credentials = MMKV.getString('credentials');
  return JSON.parse(credentials);
};

export const removeCredentials = () => {
  MMKV.delete('credentials');
};

export const storage = {
  setItem: (key, value) => {
    MMKV.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = MMKV.getString(key);
    return Promise.resolve(value);
  },
  removeItem: key => {
    MMKV.delete(key);
    return Promise.resolve();
  },
};
