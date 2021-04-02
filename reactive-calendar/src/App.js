import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navigation from './components/Navigation/Navigation';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Calendar from './components/Calendar/Calendar';
import TodoContainer from './components/TodoContainer/TodoContainer';

class App extends Component {
  state = {
    isUserAuthenticated: true
  };

  render() {
    return (
      <div>
        <BrowserRouter>
          <Navigation
            isUserAuthenticated={this.state.isUserAuthenticated}
            redirect={this.changePage} />
          <Switch>
            <Route path='/Calendar' component={Calendar} />
            <Route path='/Login' component={Login} />
            <Route path='/Register' component={Register} />
            <Route path='/Todo' component={TodoContainer} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
