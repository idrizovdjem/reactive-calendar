import React from 'react';
import { Link } from 'react-router-dom';
import authService from '../../services/authService.js';

import classes from './Navigation.module.css';

const Navigation = (props) => {
    let buttons = null;
    
    if(authService.isUserAuthenticated()) {
        buttons = (
            <span>
                <button className={classes.NavigationButton}>Logout</button>
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

    return (
        <nav className={classes.Navigation}>
            <span className={classes.Logo}>Reactive Calendar</span>
            {buttons}
        </nav>
    );
}

export default Navigation;