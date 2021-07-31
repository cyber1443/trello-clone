import {run} from '../../utils/httpClient';

export const updateList = async ({id, name}) => {
  const request = {
    method: 'PUT',
    url: `/lists/${id}`,
    data: {
      name,
    },
  };
  const response = await run(request);
  return response;
};
