import {run} from '../../utils/httpClient';

export const deleteCard = async id => {
  const request = {
    method: 'DELETE',
    url: `/cards/${id}`,
  };
  const response = await run(request);
  return response;
};
