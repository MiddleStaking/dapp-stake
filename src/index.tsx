import './index.css';
import './assets/sass/theme.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { initApp } from 'lib';

import { createRoot } from 'react-dom/client';
import { App } from './App';
import { config } from './initConfig';

initApp(config).then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});

// (() => {
//   const container = document.getElementById('root');
//   const root = createRoot(container as HTMLElement);

//   root.render(<App />);
// })();
