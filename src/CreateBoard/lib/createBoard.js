import {run} from '../../utils/httpClient';

export const create = async ({name, backgroundColor}) => {
  const request = {
    method: 'POST',
    url: '/boards',
    data: {
      name,
      prefs_background: backgroundColor,
      idBoardSource: false,
    },
  };
  const response = await run(request);
  return response;
};
