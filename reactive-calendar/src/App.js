import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import authService from './services/authService.js';

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
    this.setState({ redirect: page });
  }

  render() {
    const redirect = this.state.redirect ? <Redirect to={this.state.redirect} /> : null;

    const requireAuthentication = (Component, props) => {
      if (!authService.isUserAuthenticated()) {
        return <Redirect to='/Login'/>
      }

      return <Component redirect={this.redirect} {...props} />
    }

    const requireAnonymous = (Component, props) => {
      if (authService.isUserAuthenticated()) {
        return <Redirect to='/Calendar' />
      }

      return <Component redirect={this.redirect} {...props} />
    }
  
    return (
      <div>
        <BrowserRouter>
          {redirect}
          <Navigation redirect={this.redirect} />
          <Switch>
            <Route path='/Login' render={(props) => requireAnonymous(Login, props)} />
            <Route path='/Register' render={(props) => requireAnonymous(Register, props)} />
            <Route path='/Calendar' render={(props) => requireAuthentication(Calendar, props)} />
            <Route path='/Todo/:date' render={(props) => requireAuthentication(TodoContainer, props)} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
