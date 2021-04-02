import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Navigation from './components/Navigation/Navigation';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Calendar from './components/Calendar/Calendar';
import TodoContainer from './components/TodoContainer/TodoContainer';

class App extends Component {
  state = {
    authToken: null
  }

  authenticateUser = (authToken) => {
    this.setState({ authToken: authToken });
  }

  render() {
    const requireAuthentication = (Component) => {
      if(this.state.authToken === null) {
        return <Redirect to='/Login' />
      }
      
      return <Component />
    }

    return (
      <div>
        <BrowserRouter>
          <Navigation redirect={this.changePage} isAuthenticated={this.state.authToken !== null}/>
          <Switch>
            <Route path='/Login' render={(props) => <Login {...props} authenticate={this.authenticateUser} />} />
            <Route path='/Register' render={(props) => <Register {...props} authenticate={this.authenticateUser} />} />
            <Route path='/Calendar' render={() => requireAuthentication(Calendar)} />
            <Route path='/Todo' render={() => requireAuthentication(TodoContainer)} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
