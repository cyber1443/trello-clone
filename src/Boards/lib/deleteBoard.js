import {run} from '../../utils/httpClient';

export const deleteBoard = async id => {
  const request = {
    method: 'DELETE',
    url: `/boards/${id}`,
  };
  const response = await run(request);
  return response;
};
