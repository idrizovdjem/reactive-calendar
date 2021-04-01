import React, { Component } from 'react';

import Navigation from './components/Navigation/Navigation';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Calendar from './components/Calendar/Calendar';
import TodoContainer from './components/TodoContainer/TodoContainer';

class App extends Component {
  state = {
    isUserAuthenticated: true,
    currentPage: 'Todo'
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
    } else if(this.state.currentPage === 'Todo') {
      renderElement = <TodoContainer />
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
