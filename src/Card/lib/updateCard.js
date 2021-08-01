import {run} from '../../utils/httpClient';

export const updateCard = async ({id, name, desc, listId, pos}) => {
  const request = {
    method: 'PUT',
    url: `/cards/${id}`,
    data: {
      name,
      desc,
      idList: listId,
      pos,
    },
  };
  const response = await run(request);
  return response;
};
