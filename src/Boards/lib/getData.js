import {run} from '../../utils/httpClient';

export const getData = async () => {
  const request = {
    method: 'GET',
    url: '/members/me/boards',
  };
  const response = await run(request);
  return response;
};
