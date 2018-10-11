import { loadState } from './localStorage';

function getBaseRequestConfig() {
  const state = loadState();

  const config = {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (state && state.hasOwnProperty('auth.token')) {
    config.headers.Authorization = `Bearer ${state.auth.token}`;
  }

  return config;
}

function getHostname() {
  if (typeof window === 'object') {
    // client execution, directly use window object
    const port = window.location.port && `:${window.location.port}`;

    return `http://${window.location.hostname}${port}`;
  } else {
    return `http://localhost:AM.environment('NODE_PORT')`;
  }
}

export { getBaseRequestConfig, getHostname };
