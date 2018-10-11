import httpRequest from './httpRequest';
import { getBaseRequestConfig } from './baseRequestConfig';

export function getSubRedditPosts(subreddit, tab = 'new') {
  const baseRequestConfig = getBaseRequestConfig();
  const url = `https://www.reddit.com/r/${subreddit}/${tab}.json?limit=5`;

  const requestConfig = Object.assign({}, baseRequestConfig, {
    url: url,
  });

  return httpRequest(requestConfig);
}
