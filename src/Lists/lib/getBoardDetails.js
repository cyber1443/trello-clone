import {run} from '../../utils/httpClient';

export const getBoardDetails = async id => {
  const request = {
    method: 'GET',
    url: `/boards/${id}`,
  };
  const response = await run(request);
  return response;
};
