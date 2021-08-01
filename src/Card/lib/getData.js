import {run} from '../../utils/httpClient';

export const getData = async id => {
  const request = {
    method: 'GET',
    url: `/cards/${id}`,
  };
  const response = await run(request);
  return response;
};
