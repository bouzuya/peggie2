import React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { App } from '../components/app';
import { State } from '../types/';

type Props = {
  store: Store<State>;
};

const component = ({ store }: Props): JSX.Element =>
  <Provider store={store}>
    <App />
  </Provider>;

export { component as Root };
