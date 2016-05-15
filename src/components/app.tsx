import React from 'react';
import { bindActionCreators, Dispatch, Action } from 'redux';
import { connect } from 'react-redux';
import { State } from '../types/';
import { create as createDecrementAction } from '../actions/decrement';
import { create as createIncrementAction } from '../actions/increment';

type Props = DataProps & ActionProps;
type DataProps = {
  count: number;
};
type ActionProps = {
  decrement: typeof createDecrementAction
  increment: typeof createIncrementAction
};

const component = ({ count, decrement, increment }: Props): JSX.Element =>
  <div className="count">
    <p>
      {
        count
      }
    </p>
    <button onClick={decrement}>-</button>
    <button onClick={increment}>+</button>
  </div>;

const connectedComponent = connect(
  ({ count: { count } }: State): DataProps => {
    return { count };
  },
  (dispatch: Dispatch<Action>): ActionProps => {
    return bindActionCreators({
      decrement: createDecrementAction,
      increment: createIncrementAction
    }, dispatch);
  }
)(component);

export { connectedComponent as App };
