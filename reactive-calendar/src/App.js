import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import authService from './services/authService.js';

import Navigation from './components/Navigation/Navigation';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Calendar from './components/Calendar/Calendar';
import TodoContainer from './components/TodoContainer/TodoContainer';

class App extends Component {
  render() {
    const requireAuthentication = (Component) => {
      if(!authService.isUserAuthenticated()) {
        return <Redirect to='/Login' />
      }
      
      return <Component />
    }

    return (
      <div>
        <BrowserRouter>
          <Navigation redirect={this.changePage} />
          <Switch>
            <Route path='/Login' component={Login} />
            <Route path='/Register' component={Register} />
            <Route path='/Calendar' render={() => requireAuthentication(Calendar)} />
            <Route path='/Todo' render={() => requireAuthentication(TodoContainer)} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
