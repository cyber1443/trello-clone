import axios from 'axios';
import {getCredentials} from './storage';
import {apiKey, apiBaseUrl} from './environment';

const getAuthHeaders = () => {
  const {token} = getCredentials();
  return {
    Authorization: `OAuth oauth_consumer_key="${apiKey}", oauth_token="${token}"`,
  };
};

const prepRequest = request => {
  const {method, data, url, params} = request;
  const headers = {
    ...getAuthHeaders(),
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  return {
    data,
    headers,
    method,
    url,
    params,
    baseURL: apiBaseUrl,
  };
};

const doRequest = async options => {
  return await axios.request(options);
};

export const run = async request => {
  const options = prepRequest(request);
  return await doRequest(options);
};
