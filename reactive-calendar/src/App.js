import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import authService from './services/authService.js';
import history from './history.js';

import Navigation from './components/Navigation/Navigation';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Calendar from './components/Calendar/Calendar';
import TodoContainer from './components/TodoContainer/TodoContainer';

class App extends Component {
  state = {
    redirect: null,
    currentPage: null
  };

  componentDidMount() {
    const lastPage = sessionStorage.getItem('page');
    this.setState({ redirect: lastPage });
  }

  redirect = (page) => {
    history.push(page);
    sessionStorage.setItem('page', page);
    this.setState({ currentPage: page });
  }

  render() {
    const requireAuthentication = (Component, props) => {
      // middleware function that checks if the user is authenticated
      // if the user is not authenticated, he is redirected to Login page
      // otherwise the desired component is rendered

      if (!authService.isUserAuthenticated()) {
        this.redirect('/Login');
      }

      return <Component redirect={this.redirect} {...props} />
    }

    const requireAnonymous = (Component, props) => {
      // middleware function that checks if the user is not authenticated
      // if he is not, then the app renderes the desired component
      // if he is authenticated, he is redirected to Calendar component

      if (authService.isUserAuthenticated()) {
        this.redirect('/Calendar');
      }

      return <Component redirect={this.redirect} {...props} />
    }

    return (
      <div>
        <Navigation redirect={this.redirect} />
        <Router history={history}>
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
