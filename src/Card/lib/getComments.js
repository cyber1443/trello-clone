import {run} from '../../utils/httpClient';

export const getComments = async id => {
  const request = {
    method: 'GET',
    url: `/cards/${id}/actions/?filter=commentCard`,
  };
  const response = await run(request);
  return response;
};
