import React from 'react';
import { hot } from 'react-hot-loader';

import LightSpaceForm from 'Components/Form';
import Header from 'Components/Header';

const App = (props) => {
  return (
    <div>
      <Header title="Lighting Space Calculator" />
      <LightSpaceForm />
    </div>
  );
};

export default hot(module)(App);
