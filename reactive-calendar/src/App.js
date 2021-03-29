import React, { Component } from 'react';

import Navigation from './components/Navigation/Navigation.js';

class App extends Component {
  state = {
    isUserAuthenticated: false
  };

  render() {
    return (
      <div>
        <Navigation 
          isUserAuthenticated={this.state.isUserAuthenticated}/>
      </div>
    );
  }
}

export default App;
