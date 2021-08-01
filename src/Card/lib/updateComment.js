import {run} from '../../utils/httpClient';

export const updateComment = async ({id, actionId, text}) => {
  const request = {
    method: 'PUT',
    url: `/cards/${id}/actions/${actionId}/comments`,
    data: {
      text,
    },
  };
  const response = await run(request);
  return response;
};
