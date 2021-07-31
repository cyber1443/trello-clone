import {run} from '../../utils/httpClient';

export const updateBoard = async ({id, name}) => {
  const request = {
    method: 'PUT',
    url: `/boards/${id}`,
    data: {
      name,
    },
  };
  const response = await run(request);
  return response;
};
