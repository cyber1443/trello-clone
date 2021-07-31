import {run} from '../../utils/httpClient';

export const createCard = async ({listId, name}) => {
  const request = {
    method: 'POST',
    url: '/cards',
    data: {
      name,
      idList: listId,
      pos: 'bottom',
    },
  };
  const response = await run(request);
  return response;
};
