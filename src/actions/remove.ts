import { Action } from 'redux';
import { D, remove as removeD } from '../models/w';

export interface RemoveAction extends Action {
  payload: {
    index: number;
  };
}

const type = 'remove';
const create = (index: number): RemoveAction => {
  return { type, payload: { index } };
};
const is = (action: Action): action is RemoveAction => action.type === type;

export { create, is };
