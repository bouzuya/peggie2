import { Action } from 'redux';
import { D } from '../models/w';

export interface AddAction extends Action {
  payload: {
    index: number;
    data: D;
  };
}

const type = 'add';
const create = (index: number, data: D): AddAction => {
  return { type, payload: { index, data } };
};
const is = (action: Action): action is AddAction => action.type === type;

export { create, is };
