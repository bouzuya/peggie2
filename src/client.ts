import { createElement } from 'react';
import { render } from 'react-dom';
import { createStore } from './store';
import { Root } from './components/root';

const main = (): void => {
  const initialState = (<any> window).__INITIAL_STATE;
  const store = createStore(initialState);
  const element = createElement(Root, { store });
  render(element, document.querySelector('.app'));
};

main();
