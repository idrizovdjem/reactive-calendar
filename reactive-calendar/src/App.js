import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import authService from './services/authService.js';

import Navigation from './components/Navigation/Navigation';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Calendar from './components/Calendar/Calendar';
import TodoContainer from './components/TodoContainer/TodoContainer';

class App extends Component {
  state = {
    isAuthenticated: false
  }

  componentDidMount() {
    const isAuthenticated = authService.isUserAuthenticated();
    this.setState({ isAuthenticated: isAuthenticated });
  }

  redirect = (history, page, authenticate) => {
    history.push(page);
    sessionStorage.setItem('page', page);
    if(authenticate !== undefined) {
      this.setState({ isAuthenticated: authenticate });
    }
  }

  render() {
    const requireAuthentication = (Component, props) => {
      // middleware function that checks if the user is authenticated
      // if the user is not authenticated, he is redirected to Login page
      // otherwise the desired component is rendered

      if (!authService.isUserAuthenticated()) {
        props.history.push('/Login');
      }

      return <Component redirect={this.redirect} {...props} />
    }

    const requireAnonymous = (Component, props) => {
      // middleware function that checks if the user is not authenticated
      // if he is not, then the app renderes the desired component
      // if he is authenticated, he is redirected to Calendar component

      if (authService.isUserAuthenticated()) {
        props.history.push('/Calendar');
      }

      return <Component redirect={this.redirect} {...props} />
    }

    return (
      <div>
        <HashRouter>
          <Navigation redirect={this.redirect} isAuthenticated={this.state.isAuthenticated} />
          <Switch>
            <Route path='/Login' exact render={(props) => requireAnonymous(Login, props)} />
            <Route path='/Register' exact render={(props) => requireAnonymous(Register, props)} />
            <Route path='/Calendar' exact render={(props) => requireAuthentication(Calendar, props)} />
            <Route path='/Todo/:date' exact render={(props) => requireAuthentication(TodoContainer, props)} />
            <Route path='/' exact render={(props) => requireAuthentication(Calendar, props)} /> 
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
