import React, { Component } from 'react';

import Navigation from './components/Navigation/Navigation.js';
import Login from './components/Login/Login.js';
import Register from './components/Register/Register.js';

class App extends Component {
  state = {
    isUserAuthenticated: false,
    currentPage: 'Register'
  };

  render() {
    let renderElement = null;
    if(this.state.currentPage === 'Login') {
      renderElement = <Login />
    } else if(this.state.currentPage === 'Register') {
      renderElement = <Register />
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
