import React from 'react';
import { Count } from '../components/count';

type Props = {};

const component = (): JSX.Element =>
  <div className="main">
    <Count />
  </div>;

export { component as App };
