import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { worker } from './mocks/worker';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from './GlobalStyle';
import Modal from 'react-modal';
import axios from 'axios';
import * as Sentry from '@sentry/react';

if (import.meta.env.DEV) {
  worker.start();
}

Sentry.init({
  dsn: 'https://837a2b60adead0b63c0da05f4d9b81bc@o4507055682748416.ingest.us.sentry.io/4507055686942720',
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
  tracesSampleRate: 1.0,
  tracePropagationTargets: ['localhost', /^https:\/\/techeermarket\.site\//],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
    <BrowserRouter>
      <GlobalStyle />
      <App />
    </BrowserRouter>
  // </React.StrictMode>,
);

axios.defaults.withCredentials = true;
Modal.setAppElement('#root');

