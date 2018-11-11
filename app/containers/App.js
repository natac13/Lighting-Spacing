import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

import LightSpaceForm from 'Components/Form/';


class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Sean Paul Campbell is making this program.
        <LightSpaceForm />
      </div>
    )
  }
}


export default hot(module)(App);
