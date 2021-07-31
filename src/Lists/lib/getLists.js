import {run} from '../../utils/httpClient';

export const getLists = async id => {
  const request = {
    method: 'GET',
    url: `/boards/${id}/lists`,
  };
  const response = await run(request);
  return response;
};
