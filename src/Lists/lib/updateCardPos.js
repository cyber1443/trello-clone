import {run} from '../../utils/httpClient';

export const updateCardPos = async ({id, pos}) => {
  const request = {
    method: 'PUT',
    url: `/cards/${id}`,
    data: {
      pos,
    },
  };
  const response = await run(request);
  return response;
};
