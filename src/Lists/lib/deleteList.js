import {run} from '../../utils/httpClient';

export const deleteList = async id => {
  const request = {
    method: 'PUT',
    url: `/lists/${id}/closed`,
    data: {
      value: true,
    },
  };
  const response = await run(request);
  return response;
};
