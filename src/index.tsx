import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

// window.addEventListener("beforeunload", SaveLocalStore);
// window.addEventListener("DOMContentLoaded", ReloadStore);
// window.addEventListener("close", ClearLocalStorage);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();