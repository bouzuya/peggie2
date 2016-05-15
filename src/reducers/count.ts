import { Action } from 'redux';
import { is as isDecrementAction } from '../actions/decrement';
import { is as isIncrementAction } from '../actions/increment';
import { Count } from '../types/count';

const reducer = (state: Count = { count: 0 }, action: Action): Count => {
  if (isIncrementAction(action)) return { count: state.count + 1 };
  if (isDecrementAction(action)) return { count: state.count - 1 };
  return state;
};

export { reducer };
