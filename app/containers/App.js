import React, { Component } from 'react';
import { hot } from 'react-hot-loader';


class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Sean Paul Campbell is making this program.
      </div>
    )
  }
}


export default hot(module)(App);
