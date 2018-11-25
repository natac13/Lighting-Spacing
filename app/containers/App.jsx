import React from 'react';
import { hot } from 'react-hot-loader';

import LightSpaceForm from 'Components/Form';
import Header from 'Components/Header';

import style from './style.scss';

const App = (props) => {
  return (
    <div className={style.app}>
      <Header title="Lighting Space Calculator" />
      <LightSpaceForm />
    </div>
  );
};

export default hot(module)(App);
