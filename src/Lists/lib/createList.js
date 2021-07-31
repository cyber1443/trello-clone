import {run} from '../../utils/httpClient';

export const createList = async ({name, boardId}) => {
  const request = {
    method: 'POST',
    url: '/lists',
    data: {
      name,
      idBoard: boardId,
      pos: 'bottom',
    },
  };
  const response = await run(request);
  return response;
};
