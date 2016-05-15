import React from 'react';
import { bindActionCreators, Dispatch, Action } from 'redux';
import { connect } from 'react-redux';
import { State } from '../types/';
import { create as createIncrementAction } from '../actions/increment';

type Props = DataProps & ActionProps;
type DataProps = {
  count: number;
};
type ActionProps = {
  increment: typeof createIncrementAction
};

const component = ({ count, increment }: Props): JSX.Element =>
  <p onClick={increment}>
    {
      count
    }
  </p>;

const connectedComponent = connect(
  ({ count }: State): DataProps => ({ count }),
  (dispatch: Dispatch<Action>): ActionProps => {
    return bindActionCreators({
      increment: createIncrementAction
    }, dispatch);
  }
)(component);

export { connectedComponent as App };
