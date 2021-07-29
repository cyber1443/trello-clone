import {getDeepLink} from '../../../utils/getDeepLink';
import {openAuth} from '../../../utils/inAppBrowser';
import {apiKey} from '../../../utils/environment';

export const signin = () => {
  const deepLink = getDeepLink('callback/');
  const authUrl = `https://trello.com/1/authorize?expiration=never&name=TrelloClone&scope=read,write&response_type=token&key=${apiKey}&return_url=${deepLink}`;
  openAuth({url: authUrl, deepLink});
};
