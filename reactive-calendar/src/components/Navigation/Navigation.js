import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import authService from '../../services/authService.js';

import classes from './Navigation.module.css';

class Navigation extends Component {
    state = {
        successfullLogout: false
    };

    logout = () => {
        authService.logout();
        this.props.redirect('/Login');
    }

    render() {
        let buttons = null;

        if (authService.isUserAuthenticated()) {
            buttons = (
                <span>
                    <button onClick={this.logout} className={classes.NavigationButton}>Logout</button>
                    <Link to='/Overview' className={classes.NavigationButton}>Overview</Link>
                    <Link to='/Calendar' className={classes.NavigationButton}>Calendar</Link>
                </span>
            );
        } else {
            buttons = (
                <span>
                    <Link to='/Register' className={classes.NavigationButton}>Register</Link>
                    <Link to='/Login' className={classes.NavigationButton}>Login</Link>
                </span>
            );
        }

        if(this.state.successfullLogout) {
            return <Redirect to='/Login' />
        }

        return (
            <nav className={classes.Navigation}>
                <span className={classes.Logo}>Reactive Calendar</span>
                {buttons}
            </nav>
        );
    }
}

export default Navigation;