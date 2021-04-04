import React, { Component } from 'react';
import authService from '../../services/authService.js';

import classes from './Navigation.module.css';

class Navigation extends Component {
    redirect = (page) => {
        this.props.redirect(page);
    }

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
                    <button onClick={() => this.redirect('/Overview')} className={classes.NavigationButton}>Overview</button>
                    <button onClick={() => this.redirect('/Calendar')} className={classes.NavigationButton}>Calendar</button>
                </span>
            );
        } else {
            buttons = (
                <span>
                    <button onClick={() => this.redirect('/Register')} className={classes.NavigationButton}>Register</button>
                    <button onClick={() => this.redirect('/Login')} className={classes.NavigationButton}>Login</button>
                </span>
            );
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