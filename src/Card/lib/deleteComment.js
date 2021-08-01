import {run} from '../../utils/httpClient';

export const deleteComment = async ({id, actionId}) => {
  const request = {
    method: 'DELETE',
    url: `/cards/${id}/actions/${actionId}/comments`,
  };
  const response = await run(request);
  return response;
};
