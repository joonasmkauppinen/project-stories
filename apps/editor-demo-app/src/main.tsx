import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import * as serviceWorker from './service-worker';

import { App } from './app/app';

import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
);

serviceWorker.register();
