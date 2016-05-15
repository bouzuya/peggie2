import express from 'express';
import { createElement } from 'react';
import { Store } from 'redux';
import { renderToString } from 'react-dom/server';
import { Root } from './components/root';
import { createStore } from './store';
import { State } from './types/';

const scriptRootDir = process.env.NODE_ENV === 'production'
  ? ''
  : '//localhost:3001';

const renderHTML = (store: Store<State>): string => {
  const element = createElement(Root, { store });
  const app = renderToString(element);
  const initialState = store.getState();
  const html = `
<html>
  <head><title>TITLE</title></head>
  <body>
    <div class="app">${app}</div>
    <script>
      window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
    </script>
    <script src="${scriptRootDir}/index.js"></script>
  </body>
</html>
  `;
  return html;
};

const handler = (
  request: express.Request,
  response: express.Response
): void => {
  const store = createStore();
  const html = renderHTML(store);
  response.send(html);
};

const config = {
  port: 3000
};

const main = (): void => {
  const app = express();
  const dir = __dirname + '/../../public/';
  app.use(express.static(dir));
  app.use(handler);
  app.listen(config.port);
};

main();
