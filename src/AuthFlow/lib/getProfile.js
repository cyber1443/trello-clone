import {run} from '../../utils/httpClient';

export const getProfile = async () => {
  const request = {
    method: 'GET',
    url: '/members/me',
  };
  const response = await run(request);
  return response;
};
