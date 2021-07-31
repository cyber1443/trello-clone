import {run} from '../../utils/httpClient';

export const getCards = async id => {
  const request = {
    method: 'GET',
    url: `/boards/${id}/cards`,
  };
  const response = await run(request);
  return response;
};
