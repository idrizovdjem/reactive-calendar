import React, { Component } from 'react';

import Navigation from './components/Navigation/Navigation.js';
import Login from './components/Login/Login.js';

class App extends Component {
  state = {
    isUserAuthenticated: false,
    currentPage: 'Login'
  };

  render() {
    let renderElement = null;
    if(this.state.currentPage === 'Login') {
      renderElement = <Login />
    }

    return (
      <div>
        <Navigation 
          isUserAuthenticated={this.state.isUserAuthenticated}/>
          {renderElement}
      </div>
    );
  }
}

export default App;
