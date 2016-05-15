import { Action } from 'redux';
import { is as isAddAction } from '../actions/add';
import { is as isRemoveAction } from '../actions/remove';
import { W, add as addD, remove as removeD, w } from '../models/w';

const initialState = w();
const reducer = (state: W = initialState, action: Action): W => {
  if (isAddAction(action)) {
      const { index, data } = action.payload;
      return addD(state, index, data);
  }
  if (isRemoveAction(action)) {
    const { index } = action.payload;
    return removeD(state, index);
  }
  return state;
};

export { reducer };
