import React from 'react';
import classes from './Navigation.module.css';

const Navigation = (props) => {
    let buttons = null;

    // TODO: Implement page changing
    if(props.isUserAuthenticated) {
        buttons = (
            <span>
                <button className={classes.NavigationButton}>Logout</button>
                <button className={classes.NavigationButton}>Overview</button>
                <button className={classes.NavigationButton}>Calendar</button>
            </span>
        );
    } else {
        buttons = (
            <span>
                <button className={classes.NavigationButton}>Register</button>
                <button className={classes.NavigationButton}>Login</button>
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