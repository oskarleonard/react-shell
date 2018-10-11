import createBrowserHistory from 'history/createBrowserHistory';
import createMemoryHistory from 'history/createMemoryHistory';

let history;

if (process.env.BROWSER === true) {
  // Client uses createBrowserHistory
  history = createBrowserHistory();
} else {
  // Server should use createMemoryHistory
  history = createMemoryHistory();
}

export default history;
