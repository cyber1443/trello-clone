import {run} from '../../utils/httpClient';

export const createComment = async ({id, text}) => {
  const request = {
    method: 'POST',
    url: `/cards/${id}/actions/comments`,
    data: {
      text,
    },
  };
  const response = await run(request);
  return response;
};
