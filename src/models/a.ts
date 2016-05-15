import { W, D, w, add as addD, remove as removeD } from './w';

export type A<T> = { type: string; payload: T; };

const add = (index: number, data: D): A<{ index: number; data: D; }> => {
  return { type: 'add', payload: { index, data } };
};

const remove = (index: number): A<{ index: number; }> => {
  return { type: 'remove', payload: { index } };
};

const replay = (actions: A<any>[]): W => {
  return actions.reduce(
    (w: W, a: A<any>) => {
      if (a.type === 'add') {
        const { index, data } = a.payload;
        return addD(w, index, data);
      }
      if (a.type === 'remove') {
        const { index } = a.payload;
        return removeD(w, index);
      }
      throw new Error('unknown action : ' + a.type);
    }, w());
};

export { add, remove, replay };
