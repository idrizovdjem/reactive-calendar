import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import authService from './services/authService.js';
import history from './history.js';

import Navigation from './components/Navigation/Navigation';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Calendar from './components/Calendar/Calendar';
import TodoContainer from './components/TodoContainer/TodoContainer';

class App extends Component {
  state = {
    redirect: '/Login',
  };

  redirect = (page) => {
    history.push(page);
  }

  render() {
    const redirect = this.state.redirect ? <Redirect push to={this.state.redirect} /> : null;

    const requireAuthentication = (Component, props) => {
      if (!authService.isUserAuthenticated()) {
        return <Redirect push to='/Login'/>
      }

      return <Component redirect={this.redirect} {...props} />
    }

    const requireAnonymous = (Component, props) => {
      if (authService.isUserAuthenticated()) {
        return <Redirect push to='/Calendar' />
      }

      return <Component redirect={this.redirect} {...props} />
    }

    return (
      <div>
        <Router history={history}>
          {redirect}
          <Navigation redirect={this.redirect} />
          <Switch>
            <Route path='/Login' render={(props) => requireAnonymous(Login, props)} />
            <Route path='/Register' render={(props) => requireAnonymous(Register, props)} />
            <Route path='/Calendar' render={(props) => requireAuthentication(Calendar, props)} />
            <Route path='/Todo/:date' render={(props) => requireAuthentication(TodoContainer, props)} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
