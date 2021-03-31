import React, { Component } from 'react';

import Navigation from './components/Navigation/Navigation.js';
import Login from './components/Login/Login.js';
import Register from './components/Register/Register.js';
import Calendar from './components/Calendar/Calendar.js';

class App extends Component {
  state = {
    isUserAuthenticated: true,
    currentPage: 'Calendar'
  };

  changePage = (page) => {
    this.setState({ currentPage: page });
  }

  render() {
    let renderElement = null;
    if(this.state.currentPage === 'Login') {
      renderElement = <Login />
    } else if(this.state.currentPage === 'Register') {
      renderElement = <Register />
    } else if(this.state.currentPage === 'Calendar') {
      renderElement = <Calendar />
    }

    return (
      <div>
        <Navigation 
          isUserAuthenticated={this.state.isUserAuthenticated}
          redirect={this.changePage} />
          {renderElement}
      </div>
    );
  }
}

export default App;
