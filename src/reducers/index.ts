import { Action, Reducer, combineReducers } from 'redux';
import { reducer as count } from '../reducers/count';
import { reducer as w } from '../reducers/w';
import { State } from '../types/';

const reducer = combineReducers<State>({
  count,
  w
});

export { reducer };
