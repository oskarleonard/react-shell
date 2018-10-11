import axios from 'axios';
import HttpApiCallError from './HttpApiCallError';

export default function httpRequest(requestConfig = {}) {
  return axios(requestConfig).then((response) => {
    const isSuccess = response.status >= 200 && response.status < 300;
    if (isSuccess) {
      return response;
    } else {
      const error = new HttpApiCallError(response.statusText, response.status);
      error.response = response;

      throw error;
    }
  });
}
